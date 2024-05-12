import { Box, BoxProps, Link, Text } from 'theme-ui'
import Doc from './icons/Doc'
import X from './icons/X'
import Discord from './icons/Discord'
import Telegram from './icons/Telegram'

const socials = [
  {
    name: 'Docs',
    url: 'docs',
    logo: <Doc />,
  },
  {
    name: 'Twitter',
    url: 'docs',
    logo: <X />,
  },
  {
    name: 'Discord',
    url: 'discord',
    logo: <Discord />,
  },
  {
    name: 'Telegram',
    url: 'docs',
    logo: <Telegram />,
  },
]

const Footer = (props: BoxProps) => {
  return (
    <Box mx={[1, 4]} mb="3" variant="layout.verticalAlign" {...props}>
      <Box variant="layout.verticalAlign" sx={{ gap: 3 }}>
        {socials.map((social) => (
          <Link key={social.name}>{social.logo}</Link>
        ))}
      </Box>
      <Text ml="auto" variant="muted">
        © 2024 dgnETH
      </Text>
    </Box>
  )
}

export default Footer
