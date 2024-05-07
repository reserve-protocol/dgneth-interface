import { LoadingButton } from '../components/button'
import TokenLogo from '../components/icons/TokenLogo'
import { Check } from 'react-feather'
import { Box, Spinner, Text } from 'theme-ui'
import { useZap } from '../context/ZapContext'
import { useZapTx } from '../context/ZapTxContext'

const ZapApprovalButton = () => {
  const { tokenIn } = useZap()
  const {
    hasAllowance,
    loadingApproval,
    validatingApproval,
    approve,
    approvalSuccess,
    error,
  } = useZapTx()

  if (loadingApproval) {
    return (
      <Box variant="layout.verticalAlign" mb={3}>
        <TokenLogo width={24} symbol={tokenIn.symbol} src={tokenIn.logo} />
        <Box ml="3">
          <Text variant="bold" sx={{ display: 'block' }}>
            Approve in wallet
          </Text>
          <Text variant="legend">
            {!validatingApproval && 'Proceed in wallet'}
            {validatingApproval && 'Confirming transaction'}
          </Text>
        </Box>
        <Spinner ml="auto" size={16} />
      </Box>
    )
  }

  if (approvalSuccess && !error) {
    return (
      <Box variant="layout.verticalAlign" sx={{ gap: 3 }} mb={3}>
        <Check size={24} />
        <Text variant="legend" sx={{ fontWeight: 'bold' }}>
          {tokenIn.symbol} Approved
        </Text>
      </Box>
    )
  }

  if (hasAllowance) return null

  return (
    <LoadingButton
      onClick={approve}
      loading={loadingApproval}
      text={`Approve use of ${tokenIn.symbol}`}
      fullWidth
    />
  )
}

export default ZapApprovalButton
