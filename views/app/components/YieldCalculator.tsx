import { Box, BoxProps, Text, Slider, Badge, Card, Flex } from 'theme-ui'
import { STAKE_TOKEN } from '../../../components/staking/constants'
import NumericalInput from '../../../components/zap/components/numerical-input/NumericalInput'
import { atom, useAtom, useAtomValue } from 'jotai'
import { priceAtom, stakeApyAtom } from '../state/atoms'
import { formatCurrency } from '../../../components/zap/utils'

const amountAtom = atom('')
const timeFrameAtom = atom(12)

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
  const [timeFrame, setTimeFrame] = useAtom(timeFrameAtom)

  const handleSliderChange = (e: any) => {
    setTimeFrame(e.target.value)
  }

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
          {timeFrame} months
        </Badge>
      </Box>
      <Slider
        min={1}
        max={60}
        value={timeFrame}
        onChange={handleSliderChange}
      />
      <Box variant="layout.verticalAlign">
        <Text>1 month</Text>
        <Text ml="auto">5 years</Text>
      </Box>
    </Box>
  )
}

const YieldResults = (props: BoxProps) => {
  const apy = useAtomValue(stakeApyAtom)
  const amount = useAtomValue(amountAtom)
  const timeFrame = useAtomValue(timeFrameAtom)
  const price = useAtomValue(priceAtom)

  const rewards =
    amount && apy ? Number(amount) * (timeFrame / 12) * (apy / 100) : 0

  return (
    <Box {...props}>
      <Text sx={{ fontSize: 1 }}>Results</Text>
      <Card>
        <Flex sx={{ alignItems: 'flex-end' }}>
          <Text variant="bold" sx={{ color: 'primary' }}>
            {formatCurrency(+amount + rewards)}
          </Text>
          <Text ml="auto" sx={{ fontSize: 1 }}>
            ${formatCurrency((+amount + rewards) * price)}
          </Text>
        </Flex>
        <Flex mt={3} sx={{ alignItems: 'flex-end' }}>
          <Text variant="bold" sx={{ color: 'primary' }}>
            +{formatCurrency(rewards)}
          </Text>
          <Text ml="auto" sx={{ fontSize: 1 }}>
            +${formatCurrency(rewards * price)}
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
