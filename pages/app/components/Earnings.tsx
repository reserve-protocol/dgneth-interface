import { Box, Card, Text } from 'theme-ui'

const Earnings = () => {
  return (
    <Card mt={3}>
      <Box sx={{ gap: 2 }} variant="layout.verticalAlign">
        <Text>Your earnings</Text>
        <Text ml="auto" variant="muted">
          12K
        </Text>
        <Text variant="accent">+0.8 dgnETH</Text>
      </Box>
    </Card>
  )
}

export default Earnings
