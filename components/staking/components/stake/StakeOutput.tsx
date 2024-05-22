import { useAtomValue } from 'jotai'
import {
  stakeAmountUsdAtom,
  stakeOutputAtom,
  tokenOutAtom,
  tokenOutBalance,
} from '../../atoms'
import { Box, Text } from 'theme-ui'
import TokenLogo from '../../../zap/components/icons/TokenLogo'
import { formatCurrency } from '../../../zap/utils'
import { borderRadius } from '../../../zap/theme'

const StakeBalance = () => {
  const tokenOut = useAtomValue(tokenOutAtom)
  const balance = useAtomValue(tokenOutBalance)

  return (
    <Box ml="auto" variant="layout.verticalAlign" sx={{ flexShrink: 0 }}>
      <TokenLogo width={16} src={tokenOut.logo} />
      <Text ml="2" variant="legend">
        Balance
      </Text>
      <Text variant="strong" mx="1">
        {formatCurrency(+balance.formatted, 2, {
          notation: 'compact',
          compactDisplay: 'short',
        })}
      </Text>
    </Box>
  )
}

const StakeOutput = () => {
  const tokenOut = useAtomValue(tokenOutAtom)
  const stAmount = useAtomValue(stakeOutputAtom)
  const usdAmount = useAtomValue(stakeAmountUsdAtom)

  return (
    <Box
      p={3}
      sx={{
        backgroundColor: 'secondary',
        borderRadius: borderRadius.boxes,
        overflow: 'hidden',
      }}
    >
      <Text sx={{ display: 'block' }}>You receive:</Text>
      <Box
        variant="layout.verticalAlign"
        sx={{ fontSize: 4, fontWeight: 700, overflow: 'hidden' }}
      >
        <Text>{formatCurrency(stAmount)}</Text>
        <Text variant="legend" ml="2">
          {tokenOut.symbol}
        </Text>
      </Box>
      <Box variant="layout.verticalAlign">
        <Text
          variant="legend"
          sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          ${formatCurrency(usdAmount, 2)}
        </Text>
        <StakeBalance />
      </Box>
    </Box>
  )
}

export default StakeOutput
