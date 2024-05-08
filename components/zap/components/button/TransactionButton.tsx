import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useZap } from '../../context/ZapContext'
import { Box, BoxProps, Text } from 'theme-ui'
import { CHAIN_TAGS } from '../../utils/constants'
import { useSwitchChain } from 'wagmi'
import Button, { ButtonProps } from '.'

export const ConnectWalletButton = (props: ButtonProps) => {
  const { openConnectModal } = useConnectModal()

  return (
    <Button {...props} onClick={openConnectModal}>
      <Text>Connect Wallet</Text>
    </Button>
  )
}

interface ITransactionButtonContainer extends BoxProps {
  chain?: number
}

export const TransactionButtonContainer = ({
  children,
  chain,
  ...props
}: ITransactionButtonContainer) => {
  const { chainId, account, accountChain } = useZap()
  const { switchChain } = useSwitchChain()
  const isInvalidWallet = accountChain !== (chain || chainId)

  let Component = children

  if (!account) {
    Component = <ConnectWalletButton fullWidth />
  } else if (isInvalidWallet && switchChain) {
    Component = (
      <Button
        fullWidth
        onClick={() => {
          switchChain({ chainId: chain || chainId })
        }}
      >
        <Text>Switch to {CHAIN_TAGS[chain || chainId]}</Text>
      </Button>
    )
  }

  return <Box {...props}>{Component}</Box>
}
