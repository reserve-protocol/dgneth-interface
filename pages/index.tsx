import { Box, Button, Flex, Image, Link, Text } from 'theme-ui'
import Footer from '../components/Footer'
import Brand from '../components/icons/Brand'
import DegenFork from '../components/icons/DegenFork'
import DegenStar from '../components/icons/DegenStar'

const menuItems = [
  { label: 'Mint', href: '' },
  { label: 'Stake', href: '' },
  { label: 'Docs', href: '' },
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
          sx={{ color: '#000', '&:hover': { color: '#fff' } }}
        >
          {item.label}
        </Link>
      ))}
    </Box>
  )
}

const Header = () => (
  <Box variant="layout.verticalAlign" sx={{ justifyContent: 'space-between' }}>
    <Brand dark width={123} height={40} />

    <Menu />
    <Button variant="accent" sx={{ display: ['none', 'block'] }}>
      Launch App
    </Button>
  </Box>
)

const Hero = () => (
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
            // height: [100, 255, 255],
          }}
        >
          <DegenStar width="100%" height="100%" />
        </Box>
        <Flex
          ml="auto"
          // mt={[7, 7, 0]}
          sx={{ flexShrink: 0, flexGrow: 1, justifyContent: 'right' }}
        >
          <Image
            sx={{
              flexShrink: 0,
              // width: [200, '70%', 300],
              minWidth: ['auto', 'auto', 260, 260, 300],
              position: ['relative', 'relative', 'absolute'],
              top: ['100px', '100px', '300px'],
              // right: [0, 0, -120],
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
      <Box mt={['100px', '100px', 0]} sx={{}}>
        <Text variant="bold">Powered by Reserve</Text>
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
          <Button variant="accent" px={4}>
            Start Earning
          </Button>
          <Button variant="bordered" px={4}>
            Learn More
          </Button>
        </Box>
      </Box>
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
      <Hero />
      <Footer mt={8} />
    </Box>
  )
}

export default Landing
