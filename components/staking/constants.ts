import { Address } from 'viem'

interface IToken {
  address: Address
  symbol: string
  name: string
  decimals: number
  logo: string
}

export const TOKEN: IToken = {
  address: '0x005F893EcD7bF9667195642f7649DA8163e23658',
  symbol: 'dgnETH',
  name: 'degenETH',
  decimals: 18,
  logo: '/svgs/dgneth.svg',
}

export const STAKE_TOKEN: IToken = {
  address: '0x5BDd1fA233843Bfc034891BE8a6769e58F1e1346',
  symbol: 'sdgnETH',
  name: 'staked degenETH',
  decimals: 21,
  logo: '/svgs/dgneth.svg',
}
