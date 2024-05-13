import { Box, Card, Flex, Text } from 'theme-ui'

const Balances = () => {
  return (
    <Card sx={{ flexGrow: 1 }}>
      <Text>Your dgnETH</Text>
      <Box
        mt={2}
        p={2}
        sx={{ borderRadius: '8px', backgroundColor: 'background' }}
      >
        <Flex>
          <Text>In wallet</Text>
          <Text ml="auto">$12K</Text>
        </Flex>
        <Flex>
          <Text variant="accent">4.2</Text>
          <Text variant="muted" ml="auto">
            4.5 ETH
          </Text>
        </Flex>
        <Flex mt={3}>
          <Text>Staked</Text>
          <Text ml="auto">$12K</Text>
        </Flex>
        <Flex>
          <Text>12</Text>
          <Text variant="muted" ml="auto">
            13 ETH
          </Text>
        </Flex>
      </Box>
    </Card>
  )
}

export default Balances
