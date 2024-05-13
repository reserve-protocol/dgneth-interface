import { Box, Button, Flex, Image, Link as UILink, Text } from 'theme-ui'
import Footer from '../../components/Footer'
import Brand from '../../components/icons/Brand'
import DegenFork from '../../components/icons/DegenFork'
import DegenStar from '../../components/icons/DegenStar'
import Powered from '../../components/icons/Powered'
import Link from 'next/link'

const menuItems = [
  { label: 'Mint', href: '/app?mode=mint' },
  { label: 'Stake', href: '/app?mode=stake' },
  { label: 'Docs', href: 'https://reserve.org/protocol/' },
]

const Menu = () => {
  return (
    <Box
      variant="layout.verticalAlign"
      mt={2}
      sx={{ gap: 3, fontWeight: 'bold' }}
    >
      {menuItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target={item.label === 'Docs' ? '_blank' : undefined}
        >
          <Text sx={{ color: '#000', '&:hover': { color: '#fff' } }}>
            {item.label}
          </Text>
        </Link>
      ))}
    </Box>
  )
}

const Header = () => (
  <Box variant="layout.verticalAlign" sx={{ justifyContent: 'space-between' }}>
    <Brand dark width={123} height={40} />

    <Menu />
    <Link href="/app">
      <Button variant="accent" sx={{ display: ['none', 'block'] }}>
        Launch App
      </Button>
    </Link>
  </Box>
)

const DegenArt = () => (
  <>
    <Box
      sx={{
        position: ['relative', 'relative', 'absolute'],
        right: [0, 0, 420],
        top: 0,
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: ['50%', 'auto', 'auto'],
          flexShrink: 0,
        }}
      >
        <DegenStar width="100%" height="100%" />
      </Box>
      <Flex
        ml="auto"
        sx={{ flexShrink: 0, flexGrow: 1, justifyContent: 'right' }}
      >
        <Image
          sx={{
            flexShrink: 0,
            minWidth: ['auto', 'auto', 260, 260, 300],
            position: ['relative', 'relative', 'absolute'],
            top: ['100px', '100px', '300px'],
            left: ['-20px', 0, '260px', '200px', '140px'],
            bottom: [0, 0, 0],
          }}
          src="/imgs/degen.png"
          height="auto"
          alt="degen"
        />
      </Flex>
    </Box>
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        right: [40, 40, 0, 40],
        height: [160, 220, 430],
      }}
    >
      <DegenFork height="100%" width="100%" />
    </Box>
  </>
)

const Hero = () => (
  <Box mt={['100px', '100px', 0]} sx={{}}>
    <Box variant="layout.verticalAlign">
      <Powered />
      <Text ml="2" variant="bold">
        Powered by Reserve
      </Text>
    </Box>
    <Text
      mt={4}
      mr={[0, 200, 0]}
      variant="title"
      sx={{
        fontSize: ['32px', '52px', '52px', '52px', '72px'],
        fontWeight: 'bold',
        maxWidth: ['100%', '100%', '50%'],
        lineHeight: ['42px', '62px', '62px', '62px', '82px'],
        minHeight: ['120px', 'auto'],
      }}
    >
      Truly bonkers ETH yield for the income addicts
    </Text>
    <Box
      mt={4}
      variant="layout.verticalAlign"
      sx={{
        gap: [3, 4],
        flexDirection: ['column', 'row'],
        alignItems: ['flex-start', 'center'],
      }}
    >
      <Link href="/app">
        <Button variant="accent" px={4}>
          Start Earning
        </Button>
      </Link>

      <Button variant="bordered" px={4}>
        Learn More
      </Button>
    </Box>
  </Box>
)

const Container = () => (
  <Flex
    p={[3, 5]}
    sx={{
      backgroundColor: 'primary',
      borderRadius: '0px 0px 16px 16px',
      minHeight: ['auto', 'auto', 640],
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}
  >
    <Header />
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: ['none', 'none', 'flex-end'],
        position: 'relative',
      }}
    >
      <DegenArt />
      <Hero />
    </Box>
  </Flex>
)

const Landing = () => {
  return (
    <Box
      sx={{
        maxWidth: [1300, 1700],
        width: ['95%', '95%', '90%'],
      }}
      mx="auto"
    >
      <Container />
      <Footer mt={8} />
    </Box>
  )
}

export default Landing
