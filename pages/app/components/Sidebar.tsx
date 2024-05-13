import { useAtom } from 'jotai'
import { Box, Link } from 'theme-ui'
import { isStakingAtom } from '../atoms'

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

export default Sidebar
