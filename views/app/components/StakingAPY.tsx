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
            textDecoration: !apy ? 'line-through' : 'none',
          }}
        >
          {formatCurrency(apy, 1)}%{' '}
        </Text>
        {!apy && (
          <Box variant="layout.verticalAlign" sx={{ color: 'primary' }} mt={-1}>
            <Text mr="1" sx={{ fontSize: 1, fontWeight: 500 }}>
              Extra Yield Next Week{' '}
            </Text>
            <Help content="Reserve Protocol was designed to not process revenue for strategies below a certain threshold. When this happens the current APY can be lower than the 30-day average. When this happens the current APY can be very low but the revenue not processed this week will increase the yield after the next auction!" />
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
