import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { Box, BoxProps, Spinner, Text } from 'theme-ui'
import { formatEther, formatUnits } from 'viem'
import {
  useEstimateFeesPerGas,
  useEstimateGas,
  useReadContract,
  useSimulateContract,
  type UseSimulateContractParameters,
} from 'wagmi'
import GasIcon from '../../zap/components/icons/GasIcon'
import { formatCurrency } from '../../zap/utils'
import { transactionAtom } from '../atoms'

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
  const { data: ethPrice } = useReadContract({
    abi: [
      {
        inputs: [],
        name: 'latestRoundData',
        outputs: [
          { internalType: 'uint80', name: 'roundId', type: 'uint80' },
          { internalType: 'int256', name: 'answer', type: 'int256' },
          { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
          { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
          { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    functionName: 'latestRoundData',
  })
  const transaction = useAtomValue(transactionAtom)
  const simulate = useSimulateContract(
    transaction as UseSimulateContractParameters
  )
  const { data: gas } = useEstimateGas(simulate.data?.request)
  const { data: gasPrice } = useEstimateFeesPerGas()
  const usdEstimate = useMemo(() => {
    if (!gas || !gasPrice || !ethPrice) {
      return 0
    }

    return (
      +formatEther(
        gas * (gasPrice.maxFeePerGas + gasPrice.maxPriorityFeePerGas)
      ) * +formatUnits(ethPrice[1], 8)
    )
  }, [gas, gasPrice, ethPrice])

  if (!transaction) {
    return null
  }

  return <GasEstimate total={usdEstimate} ml="auto" />
}

export default Gas
