import { useState } from 'react'
import { Plus, Minus } from 'react-feather'
import { Box, Card } from 'theme-ui'
import TabMenu from '../zap/components/tab-menu'
import Stake from './components/stake'
import Unstake from './components/unstake'

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
    <Box variant="layout.verticalAlign" p={4}>
      <TabMenu
        active={+isStaking}
        items={MenuOptions}
        onMenuChange={(key) => onChange(!!key)}
      />
    </Box>
  )
}

const Staking = () => {
  const [isStaking, setIsStaking] = useState(true)

  return (
    <Box p="0" sx={{ flexGrow: 1 }}>
      <Header isStaking={isStaking} onChange={setIsStaking} />
      {isStaking ? <Stake /> : <Unstake />}
    </Box>
  )
}

export default Staking
