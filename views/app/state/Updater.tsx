import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { erc20Abi, formatEther, formatUnits, parseEther } from 'viem'
import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useReadContracts,
} from 'wagmi'
import { STAKE_TOKEN, TOKEN } from '../../../components/staking/constants'
import StakingVault from '../../../abis/StakingVault'
import {
  accountAtom,
  balanceAtom,
  basketsNeededAtom,
  priceAtom,
  stakeBalanceAtom,
  stakeRateAtom,
  stakeTokenSupplyAtom,
  tokenSupplyAtom,
} from './atoms'
import FacadeRead from '../../../components/zap/abis/FacadeRead'

const BasketsABI = [
  {
    inputs: [],
    name: 'basketsNeeded',
    outputs: [
      {
        internalType: 'uint192',
        name: '',
        type: 'uint192',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const Updater = () => {
  // Setters
  const setBalance = useSetAtom(balanceAtom)
  const setStakeBalance = useSetAtom(stakeBalanceAtom)
  const setTokenSupply = useSetAtom(tokenSupplyAtom)
  const setStakeTokenSupply = useSetAtom(stakeTokenSupplyAtom)
  const setExchangeRate = useSetAtom(stakeRateAtom)
  const setPrice = useSetAtom(priceAtom)
  const setBasketsNeeded = useSetAtom(basketsNeededAtom)
  const setAccount = useSetAtom(accountAtom)
  // Getters
  const wallet = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  // Contract calls
  const { data: balances, refetch: refetchBalances } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'balanceOf',
        args: [wallet.address || '0x'],
      },
      {
        abi: erc20Abi,
        address: STAKE_TOKEN.address,
        functionName: 'balanceOf',
        args: [wallet.address || '0x'],
      },
    ],
    allowFailure: false,
    query: { enabled: !!wallet.address },
  })
  const { data: supplies, refetch: refetchSupply } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'totalSupply',
      },
      {
        abi: erc20Abi,
        address: STAKE_TOKEN.address,
        functionName: 'totalSupply',
      },
    ],
    allowFailure: false,
  })
  const { data: exchangeRate, refetch: refetchRate } = useReadContract({
    abi: StakingVault,
    address: STAKE_TOKEN.address,
    functionName: 'convertToShares',
    args: [parseEther('1')],
  })

  const { data: price } = useReadContract({
    abi: FacadeRead,
    address: '0x2815c24F49D5c5316Ffd0952dB0EFe68b0d5F132',
    functionName: 'price',
    args: [TOKEN.address],
  })
  const { data: basketsNeeded } = useReadContract({
    abi: BasketsABI,
    address: TOKEN.address,
    functionName: 'basketsNeeded',
  })

  useEffect(() => {
    if (price) {
      setPrice(+formatEther(price[0] + price[1] / 2n))
    }
  }, [price])

  useEffect(() => {
    if (basketsNeeded) {
      setBasketsNeeded(Number(formatEther(basketsNeeded)))
    }
  }, [basketsNeeded])

  useEffect(() => {
    if (balances) {
      setBalance({ value: balances[0], formatted: formatEther(balances[0]) })
      setStakeBalance({
        value: balances[1],
        formatted: formatEther(balances[1]),
      })
    }
  }, [balances])

  useEffect(() => {}, [])

  useEffect(() => {
    if (supplies) {
      setTokenSupply(Number(formatEther(supplies[0])))
      setStakeTokenSupply(Number(formatEther(supplies[1])))
    }
  }, [supplies])

  useEffect(() => {
    if (exchangeRate) {
      setExchangeRate(+formatUnits(exchangeRate, STAKE_TOKEN.decimals))
    }
  }, [exchangeRate])

  useEffect(() => {
    if (wallet.address && wallet.chainId === 1) {
      setAccount(wallet.address)
    } else {
      setAccount('')
    }
  }, [wallet])

  // Refresh data on block
  useEffect(() => {
    refetchBalances()
    refetchSupply()
    refetchRate()
  }, [blockNumber])

  return null
}

export default Updater
