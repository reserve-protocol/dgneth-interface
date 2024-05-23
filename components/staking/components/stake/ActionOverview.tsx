import { useAtomValue } from 'jotai'
import { Box, BoxProps, Spinner, Text } from 'theme-ui'
import {
  useEstimateFeesPerGas,
  useEstimateGas,
  useGasPrice,
  useReadContract,
  useSimulateContract,
  type UseSimulateContractParameters,
} from 'wagmi'
import { stakeRateAtom } from '../../../../views/app/state/atoms'
import GasIcon from '../../../zap/components/icons/GasIcon'
import { formatCurrency } from '../../../zap/utils'
import { transactionAtom } from '../../atoms'
import { STAKE_TOKEN, TOKEN } from '../../constants'
import { formatEther, formatUnits } from 'viem'
import { useMemo } from 'react'
import GasEstimate from '../GasEstimate'

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
      <GasEstimate />
    </Box>
  )
}

export default ActionOverview
