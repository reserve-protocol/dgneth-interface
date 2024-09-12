import { useAtomValue } from 'jotai'
import { Box, Card, Text } from 'theme-ui'
import { stakeApyAtom, stakeAvgApyAtom } from '../state/atoms'
import { formatCurrency } from '../../../components/zap/utils'
import Help from '../../../components/zap/components/help'

const StakingAPY = () => {
  const apy = useAtomValue(stakeApyAtom)
  const avgApy = useAtomValue(stakeAvgApyAtom)

  return (
    <Card
      sx={{
        flexGrow: 1,
        position: 'relative',
        minWidth: 200,
        maxWidth: 264,
        minHeight: 192,
      }}
    >
      <Text>Staking Yield</Text>
      <Box mt="2">
        <Text variant="muted">Current Staking APY</Text>
        <Text
          variant="strong"
          sx={{
            fontSize: 4,
            fontWeight: 'bold',
            color: 'primary',
            textDecoration: apy < 1 ? 'line-through' : 'none',
          }}
        >
          {formatCurrency(apy, 1)}%{' '}
        </Text>
        {apy < 1 && (
          <Box variant="layout.verticalAlign" sx={{ color: 'primary' }} mt={-1}>
            <Text mr="1" sx={{ fontSize: 1, fontWeight: 500 }}>
              Extra Yield Next Week{' '}
            </Text>
            <Help content="The Reserve protocol was designed not to process revenue for strategies below a certain threshold. When this happens, the current APY can be lower than the 30-day average, as the “current APY” may not reflect this week’s unprocessed revenue. Accordingly, an increase in the yield following the next auction is to be expected!" />
          </Box>
        )}

        <Text variant="muted" sx={{ display: 'block' }} mt="1">
          30-Day Average APY
        </Text>
        <Text
          variant="strong"
          sx={{ fontSize: 4, fontWeight: 'bold', color: 'primary' }}
        >
          {formatCurrency(avgApy, 1)}%
        </Text>
      </Box>
    </Card>
  )
}

export default StakingAPY
