import { Box } from 'theme-ui'
import ConnectButton from '../../../components/ConnectButton'
import Brand from '../../../components/icons/Brand'

const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#181818',
      }}
      p={4}
      variant="layout.verticalAlign"
    >
      <Brand />
      <Box mx="auto" />
      <ConnectButton />
    </Box>
  )
}

export default Header
