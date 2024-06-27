import FacadeRead from '../abis/FacadeRead'
import RToken from '../abis/RToken'
import { useChainlinkPrice } from '../hooks/useChainlinkPrice'
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { ChainId, supportedChains } from '../utils/chains'
import { Address, erc20Abi, formatEther, formatUnits } from 'viem'
import {
  useBalance,
  useBlockNumber,
  useContractRead,
  useReadContracts,
  useWalletClient,
} from 'wagmi'
import { RTOKEN_DATA } from '../config'

interface ReserveToken {
  address: Address
  symbol: string
  name: string
  decimals: number
  targetUnits: string
  logo: string
}

export interface TokenBalance {
  value: bigint
  balance: string // formatted balance
  decimals: number
}

type RTokenContextType = {
  chainId: number
  rTokenData: ReserveToken
  rTokenPrice: number
  balances: Record<Address, TokenBalance>
  rTokenBalance?: TokenBalance
  ethPrice: number
  issuanceAvailable: number
  redemptionAvailable: number
  accountChain?: number
  account?: Address
}

const TOKEN_BALANCES = [
  [RTOKEN_DATA.address, RTOKEN_DATA.decimals], // ETH+
  ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6], // USDC
  ['0xdAC17F958D2ee523a2206206994597C13D831ec7', 6], // USDT
  ['0x6B175474E89094C44Da98b954EedeAC495271d0F', 18], // DAI
  ['0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8], // WBTC
  ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18], // WETH
  ['0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3', 18], // MIM
  ['0x853d955aCEf822Db058eb8505911ED77F175b99e', 6], // FRAX
]

const FACADE_ADDRESSES = {
  [ChainId.Mainnet]: '0x2815c24F49D5c5316Ffd0952dB0EFe68b0d5F132',
}

const RTokenContext = createContext<RTokenContextType>({
  chainId: ChainId.Mainnet,
  rTokenData: RTOKEN_DATA,
  ethPrice: 0,
  rTokenPrice: 0,
  balances: {},
  issuanceAvailable: 0,
  redemptionAvailable: 0,
})

export const useRToken = () => {
  return useContext(RTokenContext)
}

export const RTokenProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const account = useWalletClient()
  const { data: blockNumber } = useBlockNumber({ watch: true })

  const chainId = useMemo(() => {
    if (!account.data?.chain.id) return ChainId.Mainnet
    return supportedChains.has(account.data?.chain.id)
      ? account.data.chain.id
      : ChainId.Mainnet
  }, [account.data?.chain.id])

  const ethPrice = useChainlinkPrice(
    chainId,
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
  )

  const { data: _rTokenPrice } = useContractRead({
    abi: FacadeRead,
    address: FACADE_ADDRESSES[chainId] as Address,
    functionName: 'price',
    chainId,
    args: [RTOKEN_DATA.address],
  })

  const rTokenPrice = useMemo(
    () =>
      +formatEther(
        ((_rTokenPrice?.[0] || 0n) + (_rTokenPrice?.[1] || 0n)) / 2n
      ),
    [_rTokenPrice]
  )

  const {
    data: tokenBalances,
    refetch: refreshBalances,
  }: { data: bigint[] | undefined; refetch(): void } = useReadContracts({
    contracts: TOKEN_BALANCES.map(([address]) => ({
      address: address as Address,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: account.data?.account ? [account.data.account.address] : [],
      chainId,
    })),
    allowFailure: false,
    query: { enabled: !!account.data?.account },
  })

  const { data: ethBalance } = useBalance({
    address: account.data?.account.address,
  })

  const balances = useMemo(() => {
    if (!tokenBalances || !ethBalance) return {}

    const _balances = tokenBalances.reduce((prev, value, index) => {
      const [address, decimals] = TOKEN_BALANCES[index]
      prev[address as Address] = {
        balance: formatUnits(value, decimals as number),
        value,
        decimals: address as number,
      }
      return prev
    }, {} as Record<Address, TokenBalance>)

    _balances['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'] = {
      balance: ethBalance ? ethBalance.formatted : '0',
      value: ethBalance ? ethBalance.value : 0n,
      decimals: 18,
    }

    return _balances
  }, [tokenBalances, ethBalance])

  const commonCall = useMemo(
    () => ({
      abi: RToken,
      address: RTOKEN_DATA.address,
      chainId,
    }),
    [chainId]
  )

  const { data: rTokenState, refetch } = useReadContracts({
    contracts: [
      {
        ...commonCall,
        functionName: 'issuanceAvailable',
      },
      {
        ...commonCall,
        functionName: 'redemptionAvailable',
      },
    ],
    allowFailure: false,
  })

  const [issuanceAvailable, redemptionAvailable] = useMemo(() => {
    if (!rTokenState) return [0, 0]

    return [
      +formatEther(rTokenState[0] || 0n),
      +formatEther(rTokenState[1] || 0n),
    ]
  }, [rTokenState])

  useEffect(() => {
    refetch()
    refreshBalances()
  }, [blockNumber, refetch, refreshBalances])

  return (
    <RTokenContext.Provider
      value={{
        chainId,
        ethPrice: ethPrice || 0,
        account: account.data?.account.address,
        accountChain: account.data?.chain.id,
        rTokenData: RTOKEN_DATA,
        rTokenPrice,
        rTokenBalance: balances[RTOKEN_DATA.address],
        balances,
        issuanceAvailable,
        redemptionAvailable,
      }}
    >
      {children}
    </RTokenContext.Provider>
  )
}
