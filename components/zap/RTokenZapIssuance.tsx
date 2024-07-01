import { Box, BoxProps, Link, Text } from 'theme-ui'
import ZapOperationDetails from './ZapOperationDetails'
import ZapTabs from './ZapTabs'
import { RTokenProvider } from './context/RTokenContext'
import { ZapProvider } from './context/ZapContext'
import ZapInputContainer from './input/ZapInputContainer'
import ZapOutputContainer from './output/ZapOutputContainer'
import ZapSubmit from './submit/ZapSubmit'

const RTokenZapIssuance = (props: BoxProps) => {
  return (
    <RTokenProvider>
      <ZapProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'stretch',
            borderRadius: '14px',
            bg: 'cardAlternative',
            height: 'fit-content',
            color: '#fff',
          }}
          {...props}
        >
          <Box px={4} pt={4} pb={2}>
            <ZapTabs />
          </Box>
          <Box
            pt={3}
            px={4}
            sx={{ color: 'gray', fontSize: 1, display: ['none', 'flex'] }}
          >
            <Text>
              By minting dgnETH, your ETH is deposited into select yield
              strategies across DeFi. dgnETH is pegged to ETH and doesn’t accrue
              staking rewards. You can use dgnETH to earn yield across the DeFi
              integrations listed{' '}
              <Link
                href="https://app.reserve.org/ethereum/token/0x005f893ecd7bf9667195642f7649da8163e23658/overview"
                target="_blank"
                sx={{ display: 'inline', color: 'lightgrey' }}
              >
                here
              </Link>
              .
            </Text>
          </Box>
          <Box
            p={4}
            sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <ZapInputContainer />
              <ZapOutputContainer />
            </Box>
            <ZapOperationDetails />
            <ZapSubmit />
          </Box>
        </Box>
      </ZapProvider>
    </RTokenProvider>
  )
}

export default RTokenZapIssuance
