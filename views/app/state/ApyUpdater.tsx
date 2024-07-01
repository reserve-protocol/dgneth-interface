import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../../components/zap/api'
import { ChainId } from '../../../components/zap/utils/chains'
import { underlyingApyAtom } from './atoms'

const YIELDS_API = 'https://yields.reserve.org'

const ApyUpdater = () => {
  const setApy = useSetAtom(underlyingApyAtom)
  const { data: yields } = useSWR(YIELDS_API, fetcher)

  useEffect(() => {
    const basketAPY = yields?.rtokensBasketAPY?.[ChainId.Mainnet]?.dgnETH
    setApy(basketAPY || 0)
  }, [yields, setApy])

  return null
}

export default ApyUpdater
