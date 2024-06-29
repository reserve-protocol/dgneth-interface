import { FC } from 'react'
import { ArrowUpRight } from 'react-feather'
import { Box, Link, Text } from 'theme-ui'
import CopyValue from './CopyValue'
import ChainLogo from './zap/components/icons/logos/ChainLogo'
import { shortenString } from './zap/utils'
import { ExplorerDataType, getExplorerLink } from './zap/utils/getExplorerLink'

type TokenAddressProps = {
  address: string
  chain: number
  isBridged?: boolean
}

const TokenAddress: FC<TokenAddressProps> = ({ address, chain }) => {
  return (
    <Box variant="layout.verticalAlign" sx={{ gap: 2 }}>
      <ChainLogo chain={chain} fontSize={14} />
      <Box variant="layout.centered" sx={{ alignItems: 'start' }}>
        <Text sx={{ fontSize: 14 }} color="gray">
          {shortenString(address)}
        </Text>
      </Box>
      <Box variant="layout.verticalAlign" sx={{ gap: 1 }} ml="auto">
        <CopyValue color="gray" value={address} size={14} />
        <Link
          href={getExplorerLink(address, chain, ExplorerDataType.TOKEN)}
          target="_blank"
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowUpRight color="gray" size={14} />
        </Link>
      </Box>
    </Box>
  )
}

export default TokenAddress
