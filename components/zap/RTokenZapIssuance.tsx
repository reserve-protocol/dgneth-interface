import { ArrowDown } from 'react-feather'
import { Box, Divider } from 'theme-ui'
import ZapOperationDetails from './ZapOperationDetails'
import ZapTabs from './ZapTabs'
import ZapInputContainer from './input/ZapInputContainer'
import ZapOutputContainer from './output/ZapOutputContainer'
import ZapSubmit from './submit/ZapSubmit'
import { ZapProvider } from './context/ZapContext'

const RTokenZapIssuance = () => {
  return (
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
      >
        <Box p={4}>
          <ZapTabs />
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
  )
}

export default RTokenZapIssuance
