import { atom } from 'jotai'
import { parseUnits } from 'viem'
import { STAKE_TOKEN, TOKEN } from './constants'
import {
  balanceAtom,
  priceAtom,
  stakeBalanceAtom,
  stakeRateAtom,
} from '../../views/app/state/atoms'

// General state atoms
export const isStakingAtom = atom(false)

// Prevents more than 18 decimals
export function safeParseEther(value: string, decimals = 18): bigint {
  let safeValue = ''

  if (value[0] === '.') {
    safeValue = `0.${value.substring(1, decimals + 1) || 0}`
  } else {
    const split = value.split('.')
    safeValue = `${split[0]}.${split[1]?.substring(0, decimals) ?? '0'}`
  }

  return parseUnits(safeValue, decimals)
}

export const isAmountValid = (value: bigint, max: bigint) =>
  value > 0n && value <= max

export const stakeAmountAtom = atom('')
export const stakeAmountUsdAtom = atom((get) => {
  const amount = get(stakeAmountAtom)
  const price = get(priceAtom)

  return amount ? price * Number(amount) : 0
})
export const stakeOutputAtom = atom((get) => {
  const amount = get(stakeAmountAtom)
  const rate = get(stakeRateAtom)

  return amount && rate ? Number(amount) / rate : 0
})

export const isValidStakeAmountAtom = atom((get) => {
  return isAmountValid(
    safeParseEther(get(stakeAmountAtom) || '0'),
    get(balanceAtom).value
  )
})

export const tokenInAtom = atom((get) => {
  return get(isStakingAtom) ? TOKEN : STAKE_TOKEN
})

export const tokenOutAtom = atom((get) => {
  return get(isStakingAtom) ? STAKE_TOKEN : TOKEN
})

export const tokenInBalance = atom((get) => {
  return get(isStakingAtom) ? get(balanceAtom) : get(stakeBalanceAtom)
})

export const tokenOutBalance = atom((get) => {
  return !get(isStakingAtom) ? get(stakeBalanceAtom) : get(balanceAtom)
})
