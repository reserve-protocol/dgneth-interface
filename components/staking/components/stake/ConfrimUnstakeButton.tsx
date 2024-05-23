import { useAtomValue } from 'jotai'
import Button from '../../../zap/components/button'
import { transactionAtom } from '../../atoms'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import TransactionsIcon from '../../../zap/components/icons/TransactionsIcon'
import { STAKE_TOKEN } from '../../constants'
import { Box, Text, Link, Spinner } from 'theme-ui'
import {
  ExplorerDataType,
  getExplorerLink,
} from '../../../zap/utils/getExplorerLink'
import CheckCircleIcon from '../CheckCircleIcon'

const ConfirmUnstakeButton = () => {
  const transaction = useAtomValue(transactionAtom)
  const { writeContract: unstake, data, isPending } = useWriteContract()
  const txReceipt = useWaitForTransactionReceipt({ hash: data })

  const handleUnstake = () => {
    if (transaction) {
      unstake(transaction as any)
    }
  }

  if (isPending || data) {
    return (
      <Box variant="layout.verticalAlign">
        <TransactionsIcon />
        <Box ml="2" mr="auto">
          <Text variant="bold" sx={{ display: 'block' }}>
            {!data ? 'Confirm Stake' : 'Transaction submitted'}
          </Text>
          {data ? (
            <Link
              target="_blank"
              href={getExplorerLink(data, 1, ExplorerDataType.TRANSACTION)}
            >
              View in explorer
            </Link>
          ) : (
            <Text>Sign in wallet</Text>
          )}
        </Box>
        {!txReceipt.isSuccess ? <Spinner size={16} /> : <CheckCircleIcon />}
      </Box>
    )
  }

  return (
    <Button fullWidth onClick={handleUnstake} disabled={!transaction}>
      Unstake {STAKE_TOKEN.symbol}
    </Button>
  )
}

export default ConfirmUnstakeButton
