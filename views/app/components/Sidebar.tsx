import { useAtom } from 'jotai'
import { Box, Flex, Link, Text } from 'theme-ui'
import { isStakingAtom } from '../state/atoms'
import LinkCircle from '../../../components/icons/LinkCircle'

const Sidebar = () => {
  const [isStaking, setStaking] = useAtom(isStakingAtom)

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
      <Flex
        sx={{
          position: ['relative', 'absolute'],
          flexDirection: ['row', 'column'],
          bottom: [0, 16],
          gap: 2,
        }}
        p={[4, 0]}
        ml={['auto', 0]}
      >
        <Link>
          <Box variant="layout.verticalAlign">
            <Text mr="2">Earn</Text>
            <LinkCircle />
          </Box>
        </Link>
        <Link>
          <Box variant="layout.verticalAlign">
            <Text mr="2">Learn more</Text>
            <LinkCircle />
          </Box>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Sidebar
