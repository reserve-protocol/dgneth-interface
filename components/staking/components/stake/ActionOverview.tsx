import { Box, BoxProps, Spinner, Text } from 'theme-ui'
import GasIcon from '../../../zap/components/icons/GasIcon'
import { formatCurrency } from '../../../zap/utils'
import { useAtomValue } from 'jotai'
import { STAKE_TOKEN, TOKEN } from '../../constants'
import { stakeRateAtom } from '../../../../views/app/state/atoms'

interface IGasEstimate extends BoxProps {
  total: number
  breakdown?: { label: string; value: number }[]
}

const GasEstimate = ({ total, breakdown, ...props }: IGasEstimate) => {
  return (
    <Box variant="layout.verticalAlign" {...props}>
      <GasIcon />
      <Text ml="2" mr={1}>
        Estimated gas cost:
      </Text>
      {total ? (
        <Text variant="bold">${formatCurrency(total, 3)}</Text>
      ) : (
        <Spinner size={16} />
      )}
    </Box>
  )
}

const Gas = () => {
  // if (!amount) {
  //   return null
  // }

  return <GasEstimate total={0} ml="auto" />
}

const ExchangeRate = () => {
  const rate = useAtomValue(stakeRateAtom)

  return (
    <Box mt={4} mb={3}>
      <Text>
        1 {TOKEN.symbol} = {formatCurrency(rate, 5)} {STAKE_TOKEN.symbol}
      </Text>
    </Box>
  )
}

export const ActionOverview = () => {
  return (
    <Box variant="layout.verticalAlign">
      <ExchangeRate />
      <Gas />
    </Box>
  )
}

export default ActionOverview
