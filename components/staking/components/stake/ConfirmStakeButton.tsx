import { useAtomValue } from 'jotai'
import { transactionAtom } from '../../atoms'
import {
  useBlockNumber,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { Address, erc20Abi } from 'viem'
import { STAKE_TOKEN, TOKEN } from '../../constants'
import { accountAtom } from '../../../../views/app/state/atoms'
import { useEffect } from 'react'
import Button from '../../../zap/components/button'
import { Box, Link, Text, Spinner } from 'theme-ui'
import TransactionsIcon from '../../../zap/components/icons/TransactionsIcon'
import {
  ExplorerDataType,
  getExplorerLink,
} from '../../../zap/utils/getExplorerLink'
import CheckCircleIcon from '../CheckCircleIcon'

const useAllowance = () => {
  const account = useAtomValue(accountAtom)
  const {
    data: allowance,
    refetch,
    isLoading,
  } = useReadContract({
    abi: erc20Abi,
    functionName: 'allowance',
    address: TOKEN.address,
    args: [account as Address, STAKE_TOKEN.address],
  })
  const { data: blockNumber } = useBlockNumber({ watch: true })

  useEffect(() => {
    refetch()
  }, [blockNumber, refetch])

  return { allowance, isLoading }
}

const ConfirmStakeButton = () => {
  const { allowance, isLoading: isValidatingAllowance } = useAllowance()
  const transaction = useAtomValue(transactionAtom)
  const {
    writeContract: approval,
    isPending: isApprovalPending,
    isSuccess: isApprovalSuccess,
  } = useWriteContract()
  const { writeContract: stake, data, isPending } = useWriteContract()
  const txReceipt = useWaitForTransactionReceipt({ hash: data })
  const hasAllowance =
    !isValidatingAllowance &&
    allowance &&
    transaction &&
    allowance >= (transaction.args[0] as bigint)

  const handleApprove = () => {
    if (transaction) {
      approval({
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'approve',
        args: [STAKE_TOKEN.address, transaction.args[0]],
      })
    }
  }

  const handleStake = () => {
    if (transaction) {
      stake(transaction as any)
    }
  }

  if (!hasAllowance && !data) {
    let label = `Approve ${TOKEN.symbol}`

    if (isValidatingAllowance || isApprovalSuccess) {
      label = 'Validating allowance...'
    } else if (isApprovalPending) {
      label = 'Sign in wallet...'
    }

    return (
      <Button
        fullWidth
        disabled={
          isValidatingAllowance || isApprovalPending || isApprovalSuccess
        }
        onClick={handleApprove}
      >
        {label}
      </Button>
    )
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
    <Button fullWidth onClick={handleStake} disabled={!transaction}>
      Stake {TOKEN.symbol}
    </Button>
  )
}

export default ConfirmStakeButton
