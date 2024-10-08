import Modal from '../components/modal'
import Button from '../components/button'
import Help from '../components/help'
import { X } from 'react-feather'
import { Box, Text } from 'theme-ui'
import { useZap } from '../context/ZapContext'
import ZapSettingsCollectDust from './ZapSettingsCollectDust'
import ZapSettingsSlippage from './ZapSettingsSlippage'

const ZapSettingsModal = () => {
  const { setOpenSettings } = useZap()

  return (
    <Modal
      p={0}
      width={360}
      onClose={() => setOpenSettings(false)}
      closeOnClickAway
      hideCloseButton
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <Box variant="layout.verticalAlign" p={4} mb={[3, 0]} pt={3} pb={0}>
          <Text variant="sectionTitle">Zap Settings</Text>
          <Button
            pr={0}
            onClick={() => setOpenSettings(false)}
            sx={{
              marginLeft: 'auto',
              color: '#fff',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            <X />
          </Button>
        </Box>
        <Box
          p={['12px', '12px']}
          pt={0}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Box>
            <Box
              variant="layout.verticalAlign"
              pl={'12px'}
              pr={4}
              py={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Text>Collect dust?</Text>
              <Help
                content={`Dust is the leftover amount of tokens that cannot be exchanged. If you choose to collect dust, it will be sent back to your wallet. Sending dust back to the wallet will increase transaction fee.`}
              />
            </Box>
            <ZapSettingsCollectDust />
          </Box>
          <Box>
            <Box
              variant="layout.verticalAlign"
              pl={'12px'}
              pr={4}
              py={2}
              sx={{ justifyContent: 'space-between' }}
            >
              <Text>Max. mint slippage</Text>
              <Help
                content={`The maximum amount of slippage you are willing to accept when minting. Higher slippage settings will make the transaction more likely to succeed, but may result in fewer tokens minted.`}
              />
            </Box>
            <ZapSettingsSlippage />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ZapSettingsModal
