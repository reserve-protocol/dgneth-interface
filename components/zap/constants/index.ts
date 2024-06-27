import { ChainId } from '../utils/chains'
import { Address } from 'viem'

const mainnetTokens = [
  {
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as Address,
    symbol: 'ETH',
    name: 'Ether',
    decimals: 18,
    targetUnit: 'ETH',
  },
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' as Address,
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    targetUnit: 'ETH',
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' as Address,
    symbol: 'USDC',
    name: 'USDC',
    decimals: 6,
    targetUnit: 'USD',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' as Address,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    targetUnit: 'USD',
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' as Address,
    symbol: 'DAI',
    name: 'DAI',
    decimals: 18,
    targetUnit: 'USD',
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' as Address,
    symbol: 'WBTC',
    name: 'WBTC',
    decimals: 8,
    targetUnit: 'BTC',
  },
  {
    address: '0x853d955aCEf822Db058eb8505911ED77F175b99e' as Address,
    symbol: 'FRAX',
    name: 'FRAX',
    decimals: 18,
    targetUnit: 'USD',
  },
]

export const zappableTokens = {
  [ChainId.Mainnet]: mainnetTokens,
}

export const SLIPPAGE_OPTIONS = [100000n, 10000n, 1000n]

export const PRICE_IMPACT_THRESHOLD = 3
