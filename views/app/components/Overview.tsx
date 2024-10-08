import { Box, Flex, Image, Text } from 'theme-ui'
import CheckCircle from '../../../components/icons/CheckCircle'

const checks = ['Overcollateralized', 'Audited', 'On-chain Proof of Reserves']
const strategies = [
  { label: 'ETH+/ETH LP', logo: '/imgs/convex.png' },
  { label: 'Pirex ETH', logo: '/imgs/apxeth.webp' },
]

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
        display: ['none', 'block'],
      }}
    >
      <Text mb="1" variant="bold">
        Supercharged ETH yield
      </Text>
      <Text variant="muted">
        Degen ETH gives you exposure to select yield strategies across DeFi
      </Text>
      <Flex sx={{ gap: 2, flexDirection: 'column' }} my="5">
        {checks.map((label) => (
          <Box
            key={label}
            variant="layout.verticalAlign"
            sx={{ '*': { flexShrink: 0 } }}
          >
            <CheckCircle />
            <Text
              ml="3"
              variant="muted"
              sx={{ width: '200px', display: 'block', textWrap: 'wrap' }}
            >
              {label}
            </Text>
          </Box>
        ))}
      </Flex>
      <Text mb="4" variant="bold">
        Current strategies
      </Text>
      {strategies.map((strategy) => (
        <Box variant="layout.verticalAlign" key={strategy.label} mb="2">
          <Image
            src={strategy.logo}
            height={16}
            width={16}
            alt={strategy.label}
          />
          <Text ml="3" variant="muted">
            {strategy.label}
          </Text>
        </Box>
      ))}
    </Box>
  )
}

export default Overview
