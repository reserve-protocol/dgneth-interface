import { Box, BoxProps, Text, Slider, Badge, Card, Flex } from 'theme-ui'
import { STAKE_TOKEN } from '../../../components/staking/constants'
import NumericalInput from '../../../components/zap/components/numerical-input/NumericalInput'
import { atom, useAtom } from 'jotai'

const amountAtom = atom('')

const AmountInput = (props: BoxProps) => {
  const [amount, setAmount] = useAtom(amountAtom)

  return (
    <Box {...props}>
      <Text sx={{ fontSize: 1 }}>{STAKE_TOKEN.symbol}</Text>
      <NumericalInput value={amount} onChange={setAmount} placeholder="0.00" />
    </Box>
  )
}

const Timeframe = (props: BoxProps) => {
  return (
    <Box sx={{ fontSize: 1 }} {...props}>
      <Box variant="layout.verticalAlign">
        <Text>Timeframe</Text>
        <Badge
          ml="auto"
          py="1"
          px="2"
          sx={{ backgroundColor: 'secondary', color: '#fff', fontWeight: 400 }}
        >
          4 months
        </Badge>
      </Box>
      <Slider defaultValue={25} />
      <Box variant="layout.verticalAlign">
        <Text>1 month</Text>
        <Text ml="auto">1 year</Text>
      </Box>
    </Box>
  )
}

const YieldResults = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Text sx={{ fontSize: 1 }}>Results</Text>
      <Card>
        <Flex sx={{ alignItems: 'flex-end' }}>
          <Text variant="bold" sx={{ color: 'primary' }}>
            0.000
          </Text>
          <Text ml="auto" sx={{ fontSize: 1 }}>
            $0.00
          </Text>
        </Flex>
        <Flex mt={3} sx={{ alignItems: 'flex-end' }}>
          <Text variant="bold" sx={{ color: 'primary' }}>
            +0.000
          </Text>
          <Text ml="auto" sx={{ fontSize: 1 }}>
            +$0.00
          </Text>
        </Flex>
      </Card>
    </Box>
  )
}

const Header = () => (
  <>
    <Text variant="bold">Calculate your yield</Text>
    <Text mt={1} as="p" sx={{ fontSize: 1 }} variant="muted">
      Enter an amount and move the slider to view earnings over time
    </Text>
  </>
)

const YieldCalculator = (props: BoxProps) => {
  return (
    <Box
      sx={{
        width: 240,
        borderLeft: '1px solid',
        flexShrink: 0,
        borderColor: 'secondary',
        display: ['none', 'block'],
      }}
      px={3}
      py={4}
      {...props}
    >
      <Header />
      <AmountInput mt={4} />
      <Timeframe my={4} />
      <YieldResults />
    </Box>
  )
}

export default YieldCalculator
