import { Address } from 'viem'

interface IToken {
  address: Address
  symbol: string
  name: string
  decimals: number
  logo: string
}

export const TOKEN: IToken = {
  address: '0x',
  symbol: 'dgnETH',
  name: 'degenETH',
  decimals: 18,
  logo: '/svgs/dgneth.svg',
}

export const STAKE_TOKEN: IToken = {
  address: '0x',
  symbol: 'sdgnETH',
  name: 'staked degenETH',
  decimals: 18,
  logo: '/svgs/dgneth.svg',
}
