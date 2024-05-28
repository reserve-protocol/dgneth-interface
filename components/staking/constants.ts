import { Address } from 'viem'

interface IToken {
  address: Address
  symbol: string
  name: string
  decimals: number
  logo: string
}

export const TOKEN: IToken = {
  address: '0x320623b8E4fF03373931769A31Fc52A4E78B5d70', // TODO: Change
  symbol: 'dgnETH',
  name: 'degenETH',
  decimals: 18,
  logo: '/svgs/dgneth.svg',
}

export const STAKE_TOKEN: IToken = {
  address: '0xf35b31B941D94B249EaDED041DB1b05b7097fEb6', // TODO: Change
  symbol: 'sdgnETH',
  name: 'staked degenETH',
  decimals: 18, // TODO: Change
  logo: '/svgs/dgneth.svg',
}
