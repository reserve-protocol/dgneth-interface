import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import useSWR from 'swr'
import { formatUnits } from 'viem'
import { useReadContracts } from 'wagmi'
import StakingVault from '../../../abis/StakingVault'
import { STAKE_TOKEN } from '../../../components/staking/constants'
import { fetcher } from '../../../components/zap/api'
import { ChainId } from '../../../components/zap/utils/chains'
import { stakeApyAtom, underlyingApyAtom } from './atoms'

const YIELDS_API = 'https://yields.reserve.org'

const ApyUpdater = () => {
  const setApy = useSetAtom(stakeApyAtom)
  const setUnderlyingApy = useSetAtom(underlyingApyAtom)

  const { data: yields } = useSWR(YIELDS_API, fetcher)
  const data = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        abi: StakingVault,
        address: STAKE_TOKEN.address,
        functionName: 'rewardTracker',
        chainId: ChainId.Mainnet,
      },
      {
        abi: StakingVault,
        address: STAKE_TOKEN.address,
        functionName: 'totalAssets',
        chainId: ChainId.Mainnet,
      },
    ],
  })

  useEffect(() => {
    if (data.data) {
      const rewards = +formatUnits(data.data[0][2], STAKE_TOKEN.decimals)
      const assets = +formatUnits(data.data[1], STAKE_TOKEN.decimals)

      setApy((rewards / assets) * 52 * 100)
    }
  }, [data, setApy])

  useEffect(() => {
    const basketAPY = yields?.rtokensBasketAPY?.[ChainId.Mainnet]?.dgnETH
    setUnderlyingApy(basketAPY || 0)
  }, [yields, setUnderlyingApy])

  return null
}

export default ApyUpdater
