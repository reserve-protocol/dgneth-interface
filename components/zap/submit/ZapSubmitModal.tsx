import Modal from '../components/modal'
import Button from '../components/button'
import AsteriskIcon from '../components/icons/AsteriskIcon'
import TokenLogo from '../components/icons/TokenLogo'
import { useState } from 'react'
import { X } from 'react-feather'
import { Box, Divider, Text } from 'theme-ui'
import { useZap } from '../context/ZapContext'
import ZapInputUSD from '../input/ZapInputUSD'
import ZapOutputUSD from '../output/ZapOutputUSD'
import ZapDetails from '../overview/ZapDetails'
import ZapConfirm from './ZapConfirm'
import { ZapTxProvider } from '../context/ZapTxContext'
import Skeleton from 'react-loading-skeleton'

const ZapOverview = () => {
  const [collapsed, setCollapsed] = useState(true)
  const { tokenIn, tokenOut, amountIn, amountOut, loadingZap } = useZap()

  return (
    <Box
      px={4}
      py={4}
      pt={0}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box variant="layout.verticalAlign" sx={{ gap: '12px' }}>
          <TokenLogo symbol={tokenIn.symbol} src={tokenIn.logo} width={24} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Text>You use:</Text>
            <Text sx={{ fontSize: 26, fontWeight: 700 }}>
              {amountIn} {tokenIn.symbol}
            </Text>
            <ZapInputUSD />
          </Box>
        </Box>
        <Box variant="layout.verticalAlign" sx={{ gap: '12px' }}>
          <TokenLogo symbol={tokenOut.symbol} src={tokenOut.logo} width={24} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Text>You receive:</Text>
            {loadingZap ? (
              <Skeleton width={300} height={35} />
            ) : (
              <Text sx={{ fontSize: 26, fontWeight: 700 }}>
                {amountOut} {tokenOut.symbol}
              </Text>
            )}

            <ZapOutputUSD />
          </Box>
        </Box>
      </Box>
      <Box>
        <Box variant="layout.verticalAlign">
          <Divider
            sx={{
              flexGrow: 1,
              borderStyle: 'dashed',
              borderColor: 'darkBorder',
              m: 0,
            }}
          />
          <Button small variant="hover" onClick={() => setCollapsed((c) => !c)}>
            <Box variant="layout.verticalAlign" sx={{ color: 'secondaryText' }}>
              <Text mr="2">Show more</Text>
              <AsteriskIcon />
            </Box>
          </Button>
          <Divider
            sx={{
              flexGrow: 1,
              borderStyle: 'dashed',
              borderColor: 'darkBorder',
              m: 0,
            }}
          />
        </Box>
        <Box
          sx={{
            overflow: 'hidden',
            maxHeight: collapsed ? '0px' : '1000px',
            transition: collapsed
              ? 'max-height 0.1s ease-in-out'
              : 'max-height 0.4s ease-in-out',
          }}
        >
          <ZapDetails hideGasCost />
        </Box>
      </Box>
      <ZapTxProvider>
        <ZapConfirm />
      </ZapTxProvider>
    </Box>
  )
}

const ZapSubmitModal = () => {
  const { setOpenSubmitModal, operation } = useZap()

  return (
    <Modal
      p={0}
      sx={{ border: '3px solid', borderColor: 'borderFocused', minWidth: 440 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%',
          backgroundColor: 'backgroundNested',
        }}
      >
        <Box variant="layout.verticalAlign" p={4} mb={[3, 0]} pt={4} pb={0}>
          <Text variant="title" sx={{ fontWeight: 'bold' }}>
            {`Review ${operation}`}
          </Text>
          <Button
            variant="circle"
            onClick={() => setOpenSubmitModal(false)}
            sx={{ marginLeft: 'auto', backgroundColor: 'transparent' }}
          >
            <X />
          </Button>
        </Box>

        <ZapOverview />
      </Box>
    </Modal>
  )
}

export default ZapSubmitModal
