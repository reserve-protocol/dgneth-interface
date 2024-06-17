import { Address } from 'viem'
import { TOKEN } from '../staking/constants'

export const APP_NAME = 'degenETH'
export const WALLET_CONNECT_ID = 'c0a90a7952c96b11a37226edeb32f552'
export const RTOKEN_DATA = {
  address: TOKEN.address as Address,
  symbol: 'dgnETH',
  name: 'DegenETH',
  decimals: 18,
  targetUnits: 'ETH',
  logo: '/svgs/dgneth.svg',
}
