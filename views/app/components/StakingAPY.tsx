import { useAtomValue } from 'jotai'
import { Box, Card, Text } from 'theme-ui'
import { stakeApyAtom } from '../state/atoms'
import { formatCurrency } from '../../../components/zap/utils'

const StakingAPY = () => {
  const apy = useAtomValue(stakeApyAtom)

  return (
    <Card sx={{ flexGrow: 1, position: 'relative' }}>
      <Text>Staking APY</Text>
      <Box sx={{ position: 'absolute', bottom: 16 }}>
        <Text variant="hero">{formatCurrency(apy, 1)}%</Text>
        {/* <Text variant="accent">320%</Text> <Text variant="muted">30d avg</Text> */}
      </Box>
    </Card>
  )
}

export default StakingAPY
