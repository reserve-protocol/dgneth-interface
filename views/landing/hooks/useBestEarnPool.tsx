import { useMemo } from 'react'
import { useCMSQuery, useMultiFetch } from '../utils'

const earnPoolsQuery = `
  query {
    earnPoolsCollection(where: { description_contains: "dgnETH" }) {
      items {
        llamaId
        url
      }
    }
  }
`

const DEFILLAMA_POOL_URL = 'https://yields.llama.fi/poolsEnriched?pool='

const useBestEarnPool = () => {
  const { data: cmsPools } = useCMSQuery(earnPoolsQuery)
  const { data: pools } = useMultiFetch(
    cmsPools?.data?.earnPoolsCollection?.items.map(
      (item: { llamaId: string; url: string }) =>
        `${DEFILLAMA_POOL_URL}${item.llamaId}`
    )
  )

  return useMemo(() => {
    const _cmsPools = cmsPools?.data?.earnPoolsCollection?.items || []
    const _pools = pools?.map((p: any) => p?.data?.[0])

    if (!_cmsPools || !_pools) return null

    return _pools
      .filter((pool: any) =>
        _cmsPools.map((p: any) => p.llamaId).includes(pool.pool)
      )
      .map((pool: any) => ({
        ...pool,
        url: _cmsPools.find((p: any) => p.llamaId === pool.pool)?.url,
      }))
      .sort((a: any, b: any) => b.apy - a.apy)[0]
  }, [cmsPools, pools])
}

export default useBestEarnPool
