import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { Box, Text } from 'theme-ui'
import Button from '../../../zap/components/button'
import TokenLogo from '../../../zap/components/icons/TokenLogo'
import NumericalInput from '../../../zap/components/numerical-input/NumericalInput'
import { borderRadius } from '../../../zap/theme'
import { formatCurrency } from '../../../zap/utils'
import {
  debouncedStakeAmountAtom,
  isStakingAtom,
  stakeAmountAtom,
  tokenInAtom,
  tokenInBalance,
} from '../../atoms'
import InputPostfix from './InputPostfix'
import { priceAtom } from '../../../../views/app/state/atoms'

const StakeInputField = () => {
  const amount = useAtomValue(stakeAmountAtom)
  const setAmount = useSetAtom(debouncedStakeAmountAtom)
  const tokenIn = useAtomValue(tokenInAtom)

  useEffect(() => {
    return () => {
      setAmount('')
    }
  }, [])

  return (
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <NumericalInput
        variant="transparent"
        placeholder={`0 ${tokenIn.symbol}`}
        value={amount}
        onChange={setAmount}
      />
      {!!amount && <InputPostfix amount={amount} symbol={tokenIn.symbol} />}
    </Box>
  )
}

const StakeUsdAmount = () => {
  const price = useAtomValue(priceAtom)
  const amount = useAtomValue(stakeAmountAtom)

  if (!amount) {
    return null
  }

  return (
    <Text
      mr="3"
      sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      variant="legend"
    >
      ${formatCurrency(price * Number(amount), 2)}
    </Text>
  )
}

const StakeBalance = () => {
  const tokenIn = useAtomValue(tokenInAtom)
  const balance = useAtomValue(tokenInBalance)
  const setAmount = useSetAtom(debouncedStakeAmountAtom)

  return (
    <Box ml="auto" variant="layout.verticalAlign" sx={{ flexShrink: 0 }}>
      <TokenLogo width={16} src={tokenIn.logo} />
      <Text ml="2" variant="legend">
        Balance
      </Text>
      <Text variant="strong" mx="1">
        {formatCurrency(+balance.formatted, 2, {
          notation: 'compact',
          compactDisplay: 'short',
        })}
      </Text>
      <Button
        small
        variant="muted"
        onClick={() => setAmount(balance.formatted)}
      >
        Max
      </Button>
    </Box>
  )
}

const StakeInput = () => {
  const isStaking = useAtomValue(isStakingAtom)

  return (
    <Box
      sx={{
        overflow: 'hidden',
        backgroundColor: 'focusBox',
        borderRadius: borderRadius.boxes,
      }}
      p={3}
      mb={2}
    >
      <Text>{isStaking ? 'You stake:' : 'You unstake'}</Text>
      <StakeInputField />

      <Box variant="layout.verticalAlign">
        <StakeUsdAmount />
        <StakeBalance />
      </Box>
    </Box>
  )
}
export default StakeInput
