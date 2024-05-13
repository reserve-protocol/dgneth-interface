import { useAtom } from 'jotai'
import { Box, Link, Text } from 'theme-ui'
import { isStakingAtom } from '../state/atoms'
import CheckCircle from '../../../components/icons/CheckCircle'
import LinkCircle from '../../../components/icons/LinkCircle'

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
        <Link>
          <Box variant="layout.verticalAlign">
            <Text mr="2">Earn</Text>
            <LinkCircle />
          </Box>
        </Link>
        <Link mt="2">
          <Box variant="layout.verticalAlign">
            <Text mr="2">Learn more</Text>
            <LinkCircle />
          </Box>
        </Link>
      </Box>
    </Box>
  )
}

export default Sidebar
