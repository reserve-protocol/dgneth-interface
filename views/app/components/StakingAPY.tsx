import { useAtomValue } from 'jotai'
import { Box, Card, Text } from 'theme-ui'
import { stakeApyAtom, stakeAvgApyAtom } from '../state/atoms'
import { formatCurrency } from '../../../components/zap/utils'

const StakingAPY = () => {
  const apy = useAtomValue(stakeApyAtom)
  const avgApy = useAtomValue(stakeAvgApyAtom)

  return (
    <Card
      sx={{ flexGrow: 1, position: 'relative', minWidth: 200, minHeight: 192 }}
    >
      <Text>Staking Yield</Text>
      <Box sx={{ position: 'absolute', bottom: 16 }}>
        <Text variant="muted">Current Staking APY</Text>
        <Text
          variant="strong"
          mb={1}
          sx={{ fontSize: 4, fontWeight: 'bold', color: 'primary' }}
        >
          {formatCurrency(apy, 1)}%
        </Text>
        <Text variant="muted">30-Day Average APY</Text>
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
