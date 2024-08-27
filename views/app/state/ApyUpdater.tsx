import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import useSWR from 'swr'
import { erc20Abi, formatUnits } from 'viem'
import { useReadContracts } from 'wagmi'
import StakingVault from '../../../abis/StakingVault'
import { STAKE_TOKEN, TOKEN } from '../../../components/staking/constants'
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
      {
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'balanceOf',
        args: [STAKE_TOKEN.address],
        chainId: ChainId.Mainnet,
      },
    ],
  })

  useEffect(() => {
    if (data.data) {
      const currentTime = Math.floor(new Date().getTime() / 1000)
      const rewardsEnd = Number(data.data[0][1])
      const rewardsStart = Number(data.data[0][0])
      const rewards = +formatUnits(data.data[0][2], TOKEN.decimals)
      const assets = +formatUnits(data.data[1], TOKEN.decimals)
      const sdgnEthBalance = +formatUnits(data.data[2], 18)

      if (rewardsEnd > currentTime) {
        setApy(
          (((rewards / assets) * 52 * 604800) / (rewardsEnd - rewardsStart)) *
            100
        )
      } else {
        setApy(((sdgnEthBalance - assets) / (assets * 52)) * 100)
      }
    }
  }, [data, setApy])

  useEffect(() => {
    const basketAPY = yields?.rtokensBasketAPY?.[ChainId.Mainnet]?.dgnETH
    setUnderlyingApy(basketAPY || 0)
  }, [yields, setUnderlyingApy])

  return null
}

export default ApyUpdater
