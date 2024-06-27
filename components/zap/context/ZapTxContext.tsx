import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ZapErrorType } from '../ZapError'
import { useZap } from './ZapContext'
import { Address, TransactionReceipt, parseUnits } from 'viem'
import { Allowance, useApproval } from '../hooks/useApproval'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

type ZapTxContextType = {
  error?: ZapErrorType

  hasAllowance: boolean
  loadingApproval: boolean
  validatingApproval: boolean
  approvalSuccess: boolean
  approve?: () => void

  loadingTx: boolean
  validatingTx: boolean
  sendTransaction?: () => void
  receipt?: TransactionReceipt
  onGoingConfirmation: boolean
}

const ZapTxContext = createContext<ZapTxContextType>({
  hasAllowance: false,
  loadingApproval: false,
  validatingApproval: false,
  approvalSuccess: false,
  loadingTx: false,
  validatingTx: false,
  onGoingConfirmation: false,
})

export const useZapTx = () => {
  return useContext(ZapTxContext)
}

export const ZapTxProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [error, setError] = useState<ZapErrorType>()
  const {
    chainId,
    account,
    tokenIn,
    spender,
    amountIn,
    zapResult,
    refetch,
    setOpenSubmitModal,
    resetZap,
  } = useZap()

  // Approval
  const allowance: Allowance | undefined = useMemo(() => {
    if (!tokenIn.address || !spender) return undefined
    return {
      token: tokenIn.address.toString() as Address,
      spender: spender as Address,
      amount: parseUnits(amountIn, tokenIn.decimals),
      symbol: tokenIn.symbol,
      decimals: tokenIn.decimals,
    }
  }, [tokenIn, spender, amountIn])

  const {
    hasAllowance,
    error: allowanceError,
    isLoading: loadingApproval,
    validatingApproval,
    isSuccess: approvalSuccess,
    approve,
  } = useApproval(chainId, account, allowance)

  useEffect(() => {
    if (
      allowanceError &&
      !(loadingApproval || validatingApproval || approvalSuccess)
    ) {
      setError({
        title: 'Transaction rejected',
        message: 'Please try again',
        color: 'danger',
        secondaryColor: 'rgba(255, 0, 0, 0.20)',
      })
    } else {
      setError(undefined)
    }
  }, [allowanceError, approvalSuccess, loadingApproval, validatingApproval])

  const {
    data,
    isPending: loadingTx,
    isIdle: isIdleTx,
    sendTransaction,
    error: sendError,
  } = useSendTransaction()

  const { data: receipt, isLoading: validatingTx } =
    useWaitForTransactionReceipt({
      hash: data,
      chainId,
    })

  const execute = useCallback(() => {
    if (zapResult?.tx) {
      sendTransaction({
        data: zapResult.tx.data as Address,
        gas: BigInt(zapResult.gas ?? 0) || undefined,
        to: zapResult.tx.to as Address,
        value: BigInt(zapResult.tx.value),
      })
    }
  }, [sendTransaction, zapResult])

  const onGoingConfirmation = Boolean(
    (loadingApproval ||
      approvalSuccess ||
      loadingTx ||
      validatingTx ||
      receipt) &&
      !error
  )

  useEffect(() => {
    if (!approvalSuccess) return
    if (
      !error &&
      execute &&
      isIdleTx &&
      !(loadingTx || validatingTx || receipt)
    ) {
      execute()
    }
  }, [
    approvalSuccess,
    sendTransaction,
    zapResult?.tx,
    error,
    loadingTx,
    validatingTx,
    receipt,
    isIdleTx,
    execute,
  ])

  useEffect(() => {
    if (sendError && !(validatingTx || receipt)) {
      setError({
        title: 'Transaction rejected',
        message: 'Please try again',
        color: 'danger',
        secondaryColor: 'rgba(255, 0, 0, 0.20)',
      })
    } else {
      setError(undefined)
    }
  }, [sendError, setError, validatingTx, receipt])

  useEffect(() => {
    if (!receipt) return
    setTimeout(() => {
      setOpenSubmitModal(false)
      resetZap()
    }, 2000)
  }, [receipt, resetZap, setOpenSubmitModal])

  return (
    <ZapTxContext.Provider
      value={{
        error,
        hasAllowance,
        loadingApproval,
        validatingApproval,
        approvalSuccess,
        approve,
        loadingTx,
        validatingTx,
        sendTransaction: execute,
        receipt,
        onGoingConfirmation,
      }}
    >
      {children}
    </ZapTxContext.Provider>
  )
}
