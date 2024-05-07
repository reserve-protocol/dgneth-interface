import Button from '../components/button'
import TokenLogo from '../components/icons/TokenLogo'
import { useMemo } from 'react'
import { Box, Text } from 'theme-ui'
import { useZap } from '../context/ZapContext'
import { formatCurrency } from '../utils'

const ZapInputMaxButton = () => {
  const { operation, tokenIn, onClickMax } = useZap()

  const decimalsFormat = useMemo(() => {
    const balance = +(tokenIn.balance ?? 0)
    return balance > 0 && balance < 1 ? 4 : 2
  }, [tokenIn.balance])

  return (
    <Box variant="layout.verticalAlign" sx={{ gap: 1 }}>
      {operation === 'redeem' && (
        <TokenLogo symbol={tokenIn.symbol} src={tokenIn.logo} />
      )}
      <Box variant="layout.verticalAlign" sx={{ gap: 2 }}>
        <Box>
          <Text>Balance </Text>
          <Text sx={{ fontWeight: 'bold' }}>
            {formatCurrency(+(tokenIn.balance ?? '0'), decimalsFormat, {
              notation: 'compact',
              compactDisplay: 'short',
            })}
          </Text>
        </Box>
        <Button
          small
          backgroundColor="#CCCCCC"
          color="#000000"
          style={{ borderRadius: 4 }}
          onClick={onClickMax}
        >
          Max
        </Button>
      </Box>
    </Box>
  )
}

export default ZapInputMaxButton
