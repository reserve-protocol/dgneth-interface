import { useMemo } from 'react'
import { useMultiFetch } from '../utils'

const llamaPools = [
  {
    llamaId: 'e3189532-eced-4e95-8c38-4a9fa04e4879',
    url: 'https://curve.finance/#/ethereum/pools/factory-stable-ng-224/deposit',
  },
  {
    llamaId: '8f9f8a30-1841-4578-aac2-e3174168588d',
    url: 'https://yearn.fi/vaults/1/0x961Ad224fedDFa468c81acB3A9Cc2cC4731809f4',
  },
  {
    llamaId: 'd3f24e3d-03ab-454a-ab6c-a353590d1f84',
    url: 'https://curve.convexfinance.com/stake/ethereum/387',
  },
  {
    llamaId: 'cc314655-9e61-4caf-968f-779a180c7955',
    url: 'https://www.stakedao.org/strategy?protocol=curve&vault=1-0x3F5882a0cd3F2f2436f0e46D13f6ab7286f8ad0e',
  },
]

const DEFILLAMA_POOL_URL = 'https://yields.llama.fi/poolsEnriched?pool='

const useBestEarnPool = () => {
  const { data: pools } = useMultiFetch(
    llamaPools.map(
      (item: { llamaId: string; url: string }) =>
        `${DEFILLAMA_POOL_URL}${item.llamaId}`
    )
  )

  return useMemo(() => {
    const _pools = pools?.map((p: any) => p?.data?.[0])

    if (!_pools) return null

    return _pools
      .filter((pool: any) =>
        llamaPools.map((p: any) => p.llamaId).includes(pool?.pool)
      )
      .map((pool: any) => ({
        ...pool,
        url: llamaPools.find((p: any) => p.llamaId === pool?.pool)?.url,
      }))
      .sort((a: any, b: any) => b.apy - a.apy)[0]
  }, [pools])
}

export default useBestEarnPool
