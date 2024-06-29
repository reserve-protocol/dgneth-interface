import { Box } from 'theme-ui'
import ConnectButton from '../../../components/ConnectButton'
import Brand from '../../../components/icons/Brand'
import { TOKEN } from '../../../components/staking/constants'
import TokenAddress from '../../../components/TokenAddress'
import { ChainId } from '../../../components/zap/utils/chains'

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#181818',
      }}
      p={4}
      variant="layout.verticalAlign"
    >
      <Box variant="layout.verticalAlign" sx={{ gap: 4 }}>
        <Brand />
        <Box sx={{ display: ['none', 'flex'] }}>
          <TokenAddress address={TOKEN.address} chain={ChainId.Mainnet} />
        </Box>
      </Box>
      <Box mx="auto" />
      <ConnectButton />
    </Box>
  )
}

export default Header
