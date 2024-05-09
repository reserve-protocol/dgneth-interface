import { Box } from 'theme-ui'
import StakeInput from './StakeInput'
import StakeOutput from './StakeOutput'
import ActionOverview from './ActionOverview'
import StakeButton from './StakeButton'

const Stake = () => (
  <Box p={4}>
    <StakeInput />
    <StakeOutput />
    <ActionOverview />
    <StakeButton />
  </Box>
)

export default Stake
