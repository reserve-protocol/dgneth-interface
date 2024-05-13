import { useCallback, useMemo } from 'react'
import { erc20Abi, Address } from 'viem'
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSimulateContract,
} from 'wagmi'

export interface Allowance {
  token: Address
  spender: Address
  amount: bigint
  symbol: string
  decimals: number
}

export const useApproval = (
  chainId: number,
  account?: Address,
  allowance?: Allowance | undefined
) => {
  const disable = allowance?.symbol === 'ETH'

  const {
    data,
    isLoading: validatingAllowance,
    error: allowanceError,
  } = useReadContract(
    allowance && account && !disable
      ? {
          abi: erc20Abi,
          functionName: 'allowance',
          address: allowance.token,
          args: [account, allowance.spender],
          chainId,
        }
      : undefined
  )

  const hasAllowance =
    account && allowance && !disable ? (data ?? 0n) >= allowance.amount : false

  const { data: approvalSimulation } = useSimulateContract(
    allowance && !hasAllowance
      ? {
          address: allowance.token,
          abi: erc20Abi,
          functionName: 'approve',
          args: [allowance.spender, allowance.amount],
        }
      : undefined
  )

  const {
    data: writeData,
    writeContract,
    error: approvalError,
  } = useWriteContract()

  const { status: approvalStatus, isLoading: validatingApproval } =
    useWaitForTransactionReceipt({
      hash: writeData,
    })

  const approve = useCallback(() => {
    if (approvalSimulation?.request) {
      writeContract(approvalSimulation?.request)
    }
  }, [approvalSimulation])

  const isLoading = !Boolean(approvalSimulation?.request) || validatingApproval
  const isSuccess = approvalStatus === 'success'
  const error = allowanceError || approvalError

  return useMemo(() => {
    if (disable) {
      return {
        validatingAllowance: false,
        hasAllowance: true,
        error: undefined,
        isLoading: false,
        isSuccess: false,
        approve: () => {},
        validatingApproval: false,
      }
    }
    return {
      validatingAllowance,
      validatingApproval,
      hasAllowance: hasAllowance || isSuccess,
      error,
      isLoading,
      isSuccess,
      approve,
    }
  }, [
    disable,
    validatingAllowance,
    validatingApproval,
    hasAllowance,
    isSuccess,
    error,
    isLoading,
    approve,
  ])
}
