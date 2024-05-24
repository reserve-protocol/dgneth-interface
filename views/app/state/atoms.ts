import { atom } from 'jotai'

export const FACADE_ADDRESS = '0x2815c24F49D5c5316Ffd0952dB0EFe68b0d5F132'

export const accountAtom = atom('')
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

export const underlyingApyAtom = atom(0)

// (dgnETH-total-supply * underlying-apy) / sdgnETH-total-supply
export const stakeApyAtom = atom((get) => {
  const underlyingApy = get(underlyingApyAtom)
  const supply = get(tokenSupplyAtom)
  const stakeSupply = get(stakeTokenSupplyAtom)

  if (supply && underlyingApy && stakeSupply) {
    return (supply * underlyingApy) / stakeSupply // Naive calculation for stake supply
  }

  return underlyingApy
})
