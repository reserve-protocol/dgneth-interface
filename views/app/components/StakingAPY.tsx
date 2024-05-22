import { Box, Card, Text } from 'theme-ui'

const StakingAPY = () => {
  return (
    <Card sx={{ flexGrow: 1, position: 'relative' }}>
      <Text>Staking APY</Text>
      <Box sx={{ position: 'absolute', bottom: 16 }}>
        <Text variant="hero">48%</Text>
        {/* <Text variant="accent">320%</Text> <Text variant="muted">30d avg</Text> */}
      </Box>
    </Card>
  )
}

export default StakingAPY
