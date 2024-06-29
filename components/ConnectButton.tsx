import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from 'theme-ui'

const ConnectButton = () => {
  return (
    <RainbowKitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="accent"
                    onClick={openConnectModal}
                    sx={{ py: 1 }}
                  >
                    Connect Wallet
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="danger"
                    onClick={openChainModal}
                    sx={{ py: 1 }}
                  >
                    Wrong network
                  </Button>
                )
              }

              return (
                <Button onClick={openAccountModal} type="button" sx={{ py: 1 }}>
                  {account.displayName}
                </Button>
              )
            })()}
          </div>
        )
      }}
    </RainbowKitConnectButton.Custom>
  )
}

export default ConnectButton
