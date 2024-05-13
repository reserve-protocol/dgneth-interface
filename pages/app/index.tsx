import { useAtomValue } from 'jotai'
import type { NextPage } from 'next'
import { Box, Card, Flex } from 'theme-ui'
import Footer from '../../components/Footer'
import Staking from '../../components/staking'
import { isStakingAtom } from '../../components/staking/atoms'
import RTokenZapIssuance from '../../components/zap/RTokenZapIssuance'
import Updater from './Updater'
import Balances from './components/Balances'
import Earnings from './components/Earnings'
import Header from './components/Header'
import Overview from './components/Overview'
import Sidebar from './components/Sidebar'
import StakingAPY from './components/StakingAPY'
import Supply from './components/Supply'

const IssuanceContainer = () => (
  <Flex
    sx={{
      flexGrow: 1,
      border: '3px solid',
      borderColor: 'secondary',
      borderRadius: '16px',
      backgroundColor: 'cardAlternative',
    }}
  >
    <RTokenZapIssuance style={{ flexGrow: 1 }} />
    <Overview />
  </Flex>
)

const StakingContainer = () => (
  <Flex
    sx={{
      flexGrow: 1,
      border: '3px solid',
      borderColor: 'secondary',
      borderRadius: '16px',
      backgroundColor: 'cardAlternative',
    }}
  >
    <Staking />
    <Overview />
  </Flex>
)

const ActionContainer = () => {
  const isStaking = useAtomValue(isStakingAtom)

  if (isStaking) {
    return <StakingContainer />
  }

  return <IssuanceContainer />
}

const Stats = () => (
  <Flex p={4} sx={{ gap: 3 }}>
    <StakingAPY />
    <Balances />
    <Box sx={{ flexGrow: 1.5 }}>
      <Supply />
      <Earnings />
    </Box>
  </Flex>
)

const Container = () => (
  <Card p={0} mx={4} sx={{ display: 'flex' }}>
    <Sidebar />
    <ActionContainer />
  </Card>
)

const App: NextPage = () => (
  <Box variant="layout.wrapper">
    <Header />
    <Stats />
    <Container />
    <Footer mt={7} mx={7} />
    <Updater />
  </Box>
)

export default App
