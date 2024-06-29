import { useAtom } from 'jotai'
import { Box, Flex, Link, Text } from 'theme-ui'
import { isStakingAtom } from '../state/atoms'
import LinkCircle from '../../../components/icons/LinkCircle'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { TOKEN } from '../../../components/staking/constants'

const Sidebar = () => {
  const [isStaking, setStaking] = useAtom(isStakingAtom)
  const searchParams = useSearchParams()

  const mode = searchParams.get('mode')

  useEffect(() => {
    if (!mode || mode === 'mint') {
      setStaking(false)
    } else {
      setStaking(true)
    }
  }, [mode, setStaking])

  return (
    <Flex
      ml="4"
      sx={{
        position: 'relative',
        flexDirection: ['row', 'column'],
        width: ['auto', 150],
      }}
    >
      <Box
        mt="4"
        as="ul"
        sx={{
          fontSize: [1, 'inherit'],
          margin: 0,
          padding: 0,
          li: {
            listStyle: 'none',
            cursor: 'pointer',
            display: ['inline', 'block'],
            marginRight: 3,
            '&.active': { color: 'primary', fontWeight: 'bold' },
          },
        }}
      >
        <Box
          as="li"
          className={!isStaking ? 'active' : ''}
          onClick={() => setStaking(false)}
        >
          <Text sx={{ display: ['none', 'inline'] }}>Minting</Text>
          <Text sx={{ display: ['inline', 'none'] }}>Mint</Text>
        </Box>
        <Box
          as="li"
          mt={3}
          className={isStaking ? 'active' : ''}
          onClick={() => setStaking(true)}
        >
          <Text sx={{ display: ['none', 'inline'] }}>Staking</Text>
          <Text sx={{ display: ['inline', 'none'] }}>Stake</Text>
        </Box>
        <Box
          pt={4}
          pr={4}
          sx={{ color: 'gray', fontSize: 1, display: ['none', 'flex'] }}
        >
          {isStaking ? (
            <Text>
              By staking your dgnETH, you receive sdgnETH which accrues all the
              yield from the staking contract. Staking provides easy access to
              boosted yield from diversified onchain strategies without the need
              to manage positions.
            </Text>
          ) : (
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
            </Text>
          )}
        </Box>
      </Box>
      <Flex
        sx={{
          fontSize: [1, 'inherit'],
          position: ['relative', 'absolute'],
          flexDirection: ['row', 'column'],
          bottom: [0, 16],
          gap: 2,
        }}
        py={[4, 0]}
        pr={[4, 0]}
        pl={[2, 0]}
        ml={['auto', 0]}
      >
        <Link
          href={`https://app.reserve.org/ethereum/token/${TOKEN.address}/overview#section-2`}
          target="_blank"
        >
          <Box variant="layout.verticalAlign">
            <Text mr="2">Earn</Text>
            <LinkCircle />
          </Box>
        </Link>
        <Link
          href={`https://app.reserve.org/ethereum/token/${TOKEN.address}/overview`}
          target="_blank"
        >
          <Box variant="layout.verticalAlign">
            <Text mr="2" sx={{ whiteSpace: 'nowrap' }}>
              Learn more
            </Text>
            <LinkCircle />
          </Box>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Sidebar
