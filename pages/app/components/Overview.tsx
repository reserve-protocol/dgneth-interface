import { Box, Text } from 'theme-ui'

const Overview = () => {
  return (
    <Box
      px={3}
      py={4}
      sx={{
        width: 240,
        borderLeft: '1px solid',
        flexShrink: 0,
        borderColor: 'secondary',
      }}
    >
      <Text mb="1" variant="bold">
        Big boy ETH yield
      </Text>
      <Text variant="muted">
        dgnETH gives you exposure to top yield strategies across DeFi
      </Text>
    </Box>
  )
}

export default Overview
