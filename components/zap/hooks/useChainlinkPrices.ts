import Chainlink from '../abis/Chainlink'
import { useMemo } from 'react'
import { ChainId } from '../utils/chains'
import { Address, formatUnits } from 'viem'
import { useReadContract, useReadContracts } from 'wagmi'

const WSTETH_ADDRESS = '0xc1CBa3fCea344f92D9239c08C0568f6F2F0ee452'
const CHAINLINK_ETH_FEED = '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70'

const CHAINLINK_FEED: Record<number, Record<string, Address>> = {
  [ChainId.Mainnet]: {
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48':
      '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', // USDC / USD
    '0xdAC17F958D2ee523a2206206994597C13D831ec7':
      '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D', // USDT / USD
    '0x6B175474E89094C44Da98b954EedeAC495271d0F':
      '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9', // DAI / USD
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599':
      '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // WBTC / USD
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2':
      '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // WETH / USD
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE':
      '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH / USD
    '0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3':
      '0x7A364e8770418566e3eb2001A96116E6138Eb32F', // MIM / USD
    '0x853d955aCEf822Db058eb8505911ED77F175b99e':
      '0xB9E1E3A9feFf48998E45Fa90847ed4D467E8BcfD', // FRAX / USD
  },
}

export const useChainlinkPrices = (
  chainId: number,
  tokenAddresses?: Address[]
) => {
  const chainlinkAddress =
    tokenAddresses?.map(
      (tokenAddress) =>
        CHAINLINK_FEED[chainId]?.[tokenAddress?.toString() || '']
    ) || []

  const { data } = useReadContracts({
    contracts: chainlinkAddress.map((address) => ({
      enabled: !!address,
      abi: Chainlink,
      address,
      functionName: 'latestRoundData',
      chainId,
    })),
    allowFailure: false,
    query: { enabled: !!chainlinkAddress.length },
  })

  const { data: ethData } = useReadContract({
    query: { enabled: !!tokenAddresses?.includes(WSTETH_ADDRESS) },
    abi: Chainlink,
    address: CHAINLINK_ETH_FEED,
    functionName: 'latestRoundData',
    chainId,
  })

  return useMemo(() => {
    if (!data) return undefined

    return tokenAddresses?.map((tokenAddress, i) => {
      if (tokenAddress === WSTETH_ADDRESS) {
        if (!ethData) return undefined
        return (
          +formatUnits(ethData[1], 8) * +formatUnits((data as any)[i][1], 18)
        )
      }

      return +formatUnits((data as any)[i][1], 8)
    })
  }, [data, ethData, tokenAddresses])
}
