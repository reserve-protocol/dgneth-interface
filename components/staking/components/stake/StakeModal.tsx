import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'
import { Box, BoxProps, Text } from 'theme-ui'
import TokenLogo from '../../../zap/components/icons/TokenLogo'
import Modal from '../../../zap/components/modal'
import { formatCurrency } from '../../../zap/utils'
import {
  debouncedStakeAmountAtom,
  isStakingAtom,
  stakeAmountAtom,
  stakeAmountUsdAtom,
  stakeOutputAtom,
  tokenInAtom,
  tokenOutAtom,
} from '../../atoms'
import { STAKE_TOKEN } from '../../constants'
import ConfirmStakeButton from './ConfirmStakeButton'
import ConfirmUnstakeButton from './ConfrimUnstakeButton'

interface IAmountPreview extends BoxProps {
  title: string
  amount: number
  usdAmount: number
  symbol: string
  src?: string
}

const AmountPreview = ({
  title,
  amount,
  usdAmount,
  symbol,
  src,
  ...props
}: IAmountPreview) => (
  <Box variant="layout.verticalAlign" {...props}>
    <TokenLogo symbol={symbol} width={24} src={src} />
    <Box ml="3">
      <Text variant="legend">{title}</Text>
      <Text variant="sectionTitle">
        {formatCurrency(amount, 5)} {symbol}
      </Text>
      <Text variant="legend">${formatCurrency(usdAmount, 2)}</Text>
    </Box>
  </Box>
)

const AmountsPreview = () => {
  const amount = useAtomValue(stakeAmountAtom)
  const usdAmount = useAtomValue(stakeAmountUsdAtom)
  const stAmount = useAtomValue(stakeOutputAtom)
  const isStaking = useAtomValue(isStakingAtom)
  const tokenIn = useAtomValue(tokenInAtom)
  const tokenOut = useAtomValue(tokenOutAtom)

  // Sometimes stAmount change as soon as the stake is successfull, and thats not the intended display
  const stAmountMemo = useMemo(() => stAmount, [!!stAmount])

  return (
    <>
      <AmountPreview
        title={`You use:`}
        amount={Number(amount)}
        usdAmount={usdAmount}
        symbol={!isStaking ? STAKE_TOKEN.symbol : STAKE_TOKEN.symbol}
        mb="3"
        src={tokenIn.logo}
      />
      <AmountPreview
        title={`You’ll receive:`}
        amount={stAmountMemo}
        usdAmount={usdAmount}
        src={tokenOut.logo}
        symbol={isStaking ? STAKE_TOKEN.symbol : STAKE_TOKEN.symbol}
      />
    </>
  )
}

const StakeModal = ({ onClose }: { onClose(): void }) => {
  const setAmount = useSetAtom(debouncedStakeAmountAtom)
  const isStaking = useAtomValue(isStakingAtom)
  const handleClose = useCallback(() => {
    setAmount('')
    onClose()
  }, [setAmount])

  return (
    <Modal
      title={isStaking ? 'Review stake' : 'Review unstake'}
      onClose={handleClose}
      width={440}
    >
      <AmountsPreview />
      <Box mt={3} />
      {isStaking ? <ConfirmStakeButton /> : <ConfirmUnstakeButton />}
    </Modal>
  )
}

export default StakeModal
