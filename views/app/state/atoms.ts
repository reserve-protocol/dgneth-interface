import { atom } from 'jotai'

export const isStakingAtom = atom(false)
export const priceAtom = atom(0)
export const stakeRateAtom = atom(1)
export const balanceAtom = atom({ value: 0n, formatted: '0' })
export const stakeBalanceAtom = atom({ value: 0n, formatted: '0' })
export const tokenSupplyAtom = atom(0)
export const basketsNeededAtom = atom(0)
export const stakeTokenSupplyAtom = atom(0)

export const rTokenTargetPriceAtom = atom((get) => {
  const supply = get(tokenSupplyAtom)
  const basketsNeeded = get(basketsNeededAtom)

  if (supply && basketsNeeded) {
    let priceInUnit = Math.trunc((basketsNeeded / supply) * 10000) / 10000
    let supplyInUnit = supply * priceInUnit

    return { price: priceInUnit, supply: supplyInUnit }
  }

  return { price: 0, supply: 0 }
})
