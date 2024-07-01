import { useAtom } from 'jotai'
import { Minus, Plus } from 'react-feather'
import { Box, Text } from 'theme-ui'
import TabMenu from '../zap/components/tab-menu'
import { isStakingAtom } from './atoms'
import Stake from './components/stake'

const MenuOptions = [
  { key: 1, label: 'Stake', icon: <Plus size={16} /> },
  { key: 0, label: 'Unstake', icon: <Minus size={16} /> },
]

const Header = ({
  isStaking,
  onChange,
}: {
  onChange(isStaking: boolean): void
  isStaking: boolean
}) => {
  return (
    <Box variant="layout.verticalAlign" px={4} pt={4} pb={2}>
      <TabMenu
        active={+isStaking}
        items={MenuOptions}
        onMenuChange={(key) => onChange(!!key)}
      />
    </Box>
  )
}

const Staking = () => {
  const [isStaking, setIsStaking] = useAtom(isStakingAtom)

  return (
    <Box p="0" sx={{ flexGrow: 1 }}>
      <Header isStaking={isStaking} onChange={setIsStaking} />
      <Box
        pt={3}
        px={4}
        sx={{ color: 'gray', fontSize: 1, display: ['none', 'flex'] }}
      >
        <Text>
          By staking your dgnETH, you receive sdgnETH which accrues all the
          yield from the staking contract. Staking provides easy access to
          boosted yield from diversified onchain strategies without the need to
          manage positions.
        </Text>
      </Box>
      <Stake />
    </Box>
  )
}

export default Staking
