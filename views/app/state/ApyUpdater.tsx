import { useSetAtom } from 'jotai'
import { FACADE_ADDRESS, underlyingApyAtom } from './atoms'
import useSWR from 'swr'
import { fetcher } from '../../../components/zap/api'
import { useEffect, useMemo } from 'react'
import { useReadContract, useReadContracts } from 'wagmi'
import FacadeRead from '../../../components/zap/abis/FacadeRead'
import { Address, erc20Abi, formatEther } from 'viem'
import { TOKEN } from '../../../components/staking/constants'

const YIELDS_API = 'https://yields.reserve.org'

const ApyUpdater = () => {
  const setApy = useSetAtom(underlyingApyAtom)
  const { data: yields } = useSWR(YIELDS_API, fetcher)
  const { data: basketBreakdown } = useReadContract({
    abi: FacadeRead,
    address: FACADE_ADDRESS,
    functionName: 'basketBreakdown' as any,
    args: [TOKEN.address],
  })
  // TODO: Collaterals are ETH so always use 18 decimals, maybe this change in the future?
  // TODO: Not checking revenue distribution for now
  const erc20Calls = useMemo(() => {
    if (basketBreakdown) {
      return (basketBreakdown[0] as Address[]).map((address) => ({
        abi: erc20Abi,
        address,
        functionName: 'symbol',
      }))
    }

    return undefined
  }, [basketBreakdown])
  const { data: collaterals } = useReadContracts({
    contracts: erc20Calls,
    allowFailure: false,
  })

  useEffect(() => {
    const collateralYields = yields?.collaterals
    if (collateralYields && basketBreakdown && collaterals) {
      setApy(
        (collaterals as string[]).reduce((acc, collateral, index) => {
          const collateralShare = +formatEther(
            (basketBreakdown[1] as any)[index]
          )
          const collateralYield =
            (collateralYields[1][collateral.toLowerCase()] as number) || 0

          return acc + collateralYield * collateralShare
        }, 0)
      )
    }
  }, [yields, collaterals, basketBreakdown, setApy])

  return null
}

export default ApyUpdater
