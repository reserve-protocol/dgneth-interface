import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import useSWR from 'swr'
import { Box, Card, Text } from 'theme-ui'
import { formatUnits } from 'viem'
import { STAKE_TOKEN, TOKEN } from '../../../components/staking/constants'
import { accountAtom, stakeRateAtom } from '../state/atoms'
import Skeleton from 'react-loading-skeleton'

const fetcher = (url: string, query: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data)

const Earnings = () => {
  const wallet = (useAtomValue(accountAtom) ?? '').toLowerCase()
  const rate = useAtomValue(stakeRateAtom)

  const query = `
    {
      deposits(where: {owner: "${wallet}"}, first: 1000) {
        owner
        assets
        shares
      }
      withdraws(where: {owner: "${wallet}"}, first: 1000) {
        owner
        assets
        shares
      }
    }
  `

  const { data } = useSWR(
    [
      'https://api.goldsky.com/api/public/project_cmgzim3e100095np2gjnbh6ry/subgraphs/dgneth/v0.0.3/gn',
      query,
    ],
    ([url, query]) => fetcher(url, query)
  )

  const earnings = useMemo(() => {
    if (!data) return undefined

    const deposits: { assets: number; shares: number } = data.deposits.reduce(
      (acc: { assets: number; shares: number }, deposit: any) => ({
        assets: acc.assets + +formatUnits(deposit.assets, TOKEN.decimals),
        shares: acc.shares + +formatUnits(deposit.shares, STAKE_TOKEN.decimals),
      }),
      { assets: 0, shares: 0 }
    )

    const withdraws: { assets: number; shares: number } = data.withdraws.reduce(
      (acc: { assets: number; shares: number }, withdraw: any) => ({
        assets: acc.assets + +formatUnits(withdraw.assets, TOKEN.decimals),
        shares:
          acc.shares + +formatUnits(withdraw.shares, STAKE_TOKEN.decimals),
      }),
      { assets: 0, shares: 0 }
    )

    const totalAssets = deposits.assets - withdraws.assets
    const totalShares = deposits.shares - withdraws.shares
    const currentAssets = totalShares / rate

    return currentAssets - Math.max(0, totalAssets)
  }, [data, rate])

  return (
    <Card mt={3}>
      <Box sx={{ gap: 2 }} variant="layout.verticalAlign">
        <Text>Your earnings</Text>
        {earnings !== undefined ? (
          <Text ml="auto" variant="accent">
            +
            {Intl.NumberFormat('en-US', {
              maximumFractionDigits: 6,
              compactDisplay: 'short',
              notation: 'compact',
            }).format(earnings)}{' '}
            dgnETH
          </Text>
        ) : (
          <Box ml="auto">
            <Skeleton width={100} height={20} />
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default Earnings
