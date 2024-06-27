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
import { Address, TransactionReceipt, parseUnits } from 'viem'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { ZapErrorType } from '../ZapError'
import { Allowance, useApproval } from '../hooks/useApproval'
import { useZap } from './ZapContext'

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

  const {
    data: receipt,
    isLoading: validatingTx,
    error: txError,
  } = useWaitForTransactionReceipt({
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
    if ((sendError || txError) && !(loadingTx || validatingTx || receipt)) {
      setError({
        title: 'Transaction rejected',
        message: 'Please try again',
        color: 'danger',
        secondaryColor: 'rgba(255, 0, 0, 0.20)',
      })
    } else {
      setError(undefined)
    }
  }, [sendError, setError, loadingTx, validatingTx, receipt, txError])

  useEffect(() => {
    if (!receipt) return
    setOpenSubmitModal(false)
    resetZap()
  }, [receipt, setOpenSubmitModal, resetZap])

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
