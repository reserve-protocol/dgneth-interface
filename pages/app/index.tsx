import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { Box, Card, Flex, Link, Text } from 'theme-ui'
import { erc20Abi, formatEther } from 'viem'
import { useAccount, useBlockNumber, useReadContracts } from 'wagmi'
import ConnectButton from '../../components/ConnectButton'
import Brand from '../../components/icons/Brand'
import Staking from '../../components/staking'
import {
  balanceAtom,
  stakeBalanceAtom,
  stakeTokenSupplyAtom,
  tokenSupplyAtom,
} from '../../components/staking/atoms'
import { STAKE_TOKEN, TOKEN } from '../../components/staking/constants'
import RTokenZapIssuance from '../../components/zap/RTokenZapIssuance'

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

const StakingAPY = () => {
  return (
    <Card sx={{ flexGrow: 1, position: 'relative' }}>
      <Text>Staking APY</Text>
      <Box sx={{ position: 'absolute', bottom: 16 }}>
        <Text variant="hero">48%</Text>
        <Text variant="accent">320%</Text> <Text variant="muted">30d avg</Text>
      </Box>
    </Card>
  )
}

const Balances = () => {
  return (
    <Card sx={{ flexGrow: 1 }}>
      <Text>Your dgnETH</Text>
      <Box
        mt={2}
        p={2}
        sx={{ borderRadius: '8px', backgroundColor: 'background' }}
      >
        <Flex>
          <Text>In wallet</Text>
          <Text ml="auto">$12K</Text>
        </Flex>
        <Flex>
          <Text variant="accent">4.2</Text>
          <Text variant="muted" ml="auto">
            4.5 ETH
          </Text>
        </Flex>
        <Flex mt={3}>
          <Text>Staked</Text>
          <Text ml="auto">$12K</Text>
        </Flex>
        <Flex>
          <Text>12</Text>
          <Text variant="muted" ml="auto">
            13 ETH
          </Text>
        </Flex>
      </Box>
    </Card>
  )
}

const Supply = () => {
  return (
    <Card>
      <Text>dgnETH Supply</Text>
    </Card>
  )
}

const Earnings = () => {
  return (
    <Card mt={3}>
      <Box sx={{ gap: 2 }} variant="layout.verticalAlign">
        <Text>Your earnings</Text>
        <Text ml="auto" variant="muted">
          12K
        </Text>
        <Text variant="accent">+0.8 dgnETH</Text>
      </Box>
    </Card>
  )
}

const Overview = () => {
  return (
    <Box
      px={3}
      py={4}
      sx={{
        width: 240,
        borderLeft: '1px solid',
        flexShrink: 0,
        borderColor: 'secondary',
      }}
    >
      <Text mb="1" variant="bold">
        Big boy ETH yield
      </Text>
      <Text variant="muted">
        dgnETH gives you exposure to top yield strategies across DeFi
      </Text>
    </Box>
  )
}

const isStakingAtom = atom(false)

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

const StakingContainer = () => {
  return (
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
}

const ActionContainer = () => {
  const isStaking = useAtomValue(isStakingAtom)

  if (isStaking) {
    return <StakingContainer />
  }

  return <IssuanceContainer />
}

const Sidebar = () => {
  const [isStaking, setStaking] = useAtom(isStakingAtom)

  return (
    <Box ml="4" sx={{ position: 'relative', width: 150 }}>
      <Box
        mt="4"
        as="ul"
        sx={{
          margin: 0,
          padding: 0,
          li: {
            listStyle: 'none',
            cursor: 'pointer',
            '&.active': { color: 'primary', fontWeight: 'bold' },
          },
        }}
      >
        <Box
          as="li"
          className={!isStaking ? 'active' : ''}
          onClick={() => setStaking(false)}
        >
          Minting
        </Box>
        <Box
          as="li"
          mt={3}
          className={isStaking ? 'active' : ''}
          onClick={() => setStaking(true)}
        >
          Staking
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 16 }}>
        <Link>Earn</Link>

        <Link>Learn more</Link>
      </Box>
    </Box>
  )
}

const Updater = () => {
  // Setters
  const setBalance = useSetAtom(balanceAtom)
  const setStakeBalance = useSetAtom(stakeBalanceAtom)
  const setTokenSupply = useSetAtom(tokenSupplyAtom)
  const setStakeTokenSupply = useSetAtom(stakeTokenSupplyAtom)
  // Getters
  const wallet = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  // Contract calls
  const { data: balances, refetch: refetchBalances } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'balanceOf',
        args: [wallet.address || '0x'],
      },
      {
        abi: erc20Abi,
        address: STAKE_TOKEN.address,
        functionName: 'balanceOf',
        args: [wallet.address || '0x'],
      },
    ],
    allowFailure: false,
    query: { enabled: !!wallet.address },
  })
  const { data: supplies, refetch: refetchSupply } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'totalSupply',
      },
      {
        abi: erc20Abi,
        address: STAKE_TOKEN.address,
        functionName: 'totalSupply',
      },
    ],
    allowFailure: false,
  })

  useEffect(() => {
    if (balances) {
      setBalance({ value: balances[0], formatted: formatEther(balances[0]) })
      setStakeBalance({
        value: balances[1],
        formatted: formatEther(balances[1]),
      })
    }
  }, [balances])

  useEffect(() => {
    if (supplies) {
      setTokenSupply(Number(formatEther(supplies[0])))
      setStakeTokenSupply(Number(formatEther(supplies[1])))
    }
  }, [supplies])

  // Refresh data on block
  useEffect(() => {
    refetchBalances()
    refetchSupply()
  }, [blockNumber])

  return null
}

const App: NextPage = () => {
  return (
    <Box variant="layout.wrapper">
      <Header />
      <Flex p={4} sx={{ gap: 3 }}>
        <StakingAPY />
        <Balances />
        <Box sx={{ flexGrow: 1.5 }}>
          <Supply />
          <Earnings />
        </Box>
      </Flex>
      <Card p={0} mx={4} sx={{ display: 'flex' }}>
        <Sidebar />
        <ActionContainer />
      </Card>
      <Updater />
    </Box>
  )
}

export default App
