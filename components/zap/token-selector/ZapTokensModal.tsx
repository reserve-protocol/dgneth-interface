import TokenLogo from '../components/icons/TokenLogo'
import { SearchInput } from '../components/input'
import Modal from '../components/modal'
import { ExplorerDataType, getExplorerLink } from '../utils/getExplorerLink'
import { useMemo, useState } from 'react'
import { ArrowUpRight, X } from 'react-feather'
import { Box, Button, Divider, Link, Text } from 'theme-ui'
import { Address } from 'viem'
import { useZap } from '../context/ZapContext'
import { formatCurrency, shortenString } from '../utils'
import { colors } from '../theme'

const ZapTokenList = ({
  entries,
}: {
  entries: {
    address: Address
    symbol: string
    selectToken: () => void
    explorerLink: string
    balance: string
  }[]
}) => {
  return (
    <Box
      sx={{
        height: ['auto', '430px'],
        display: 'flex',

        flexDirection: 'column',
        minWidth: '140px',
        overflow: 'auto',
      }}
    >
      {entries.map(
        ({ address, symbol, selectToken, explorerLink, balance }) => (
          <Box
            key={symbol}
            variant="layout.verticalAlign"
            px="12px"
            py={2}
            sx={{
              gap: '12px',
              cursor: 'pointer',
              borderRadius: '10px',
              ':hover': {
                backgroundColor: 'contentBackground',
              },
            }}
            onClick={selectToken}
          >
            <TokenLogo symbol={symbol} width={24} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Text variant="body" sx={{ fontWeight: 'bold' }}>
                {symbol}
              </Text>
              <Box variant="layout.verticalAlign" sx={{ gap: 1 }}>
                <Text variant="contentTitle" sx={{ color: 'darkGrey' }}>
                  {shortenString(address)}
                </Text>
                <Link
                  href={explorerLink}
                  target="_blank"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight color={colors.secondaryText} size={14} />
                </Link>
              </Box>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Text>{formatCurrency(+balance, 5)}</Text>
            </Box>
          </Box>
        )
      )}
    </Box>
  )
}

const ZapTokensModal = () => {
  const { operation, chainId, tokens, setSelectedToken, setOpenTokenSelector } =
    useZap()
  const [search, setSearch] = useState<string>('')

  const entries = useMemo(
    () =>
      tokens
        .map((token) => ({
          address: token.address as Address,
          symbol: token.symbol,
          selectToken: () => {
            setSelectedToken(token)
            setOpenTokenSelector(false)
          },
          explorerLink: getExplorerLink(
            token.address,
            chainId,
            ExplorerDataType.TOKEN
          ),
          balance: token.balance ?? '0',
        }))
        .filter(
          (entry) =>
            entry.symbol.toLowerCase().includes(search.toLowerCase()) ||
            entry.address.toLowerCase().includes(search.toLowerCase())
        ),
    [setSelectedToken, tokens, chainId, search, setOpenTokenSelector]
  )

  return (
    <Modal
      p={0}
      width={420}
      onClose={() => setOpenTokenSelector(false)}
      closeOnClickAway
      hideCloseButton
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <Box variant="layout.verticalAlign" p={4} mb={[3, 0]} pt={3} pb={0}>
          <Text variant="sectionTitle">
            {operation === 'mint' ? 'Mint' : 'Redeem'} using
          </Text>
          <Button
            variant="circle"
            onClick={() => setOpenTokenSelector(false)}
            ml="auto"
            p={2}
            pr={0}
            sx={{
              marginLeft: 'auto',
              cursor: 'pointer',
              backgroundColor: 'transparent',
            }}
          >
            <X />
          </Button>
        </Box>
        <Box
          p={['12px', '12px']}
          pt={0}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <SearchInput
            placeholder="Search by token name or address"
            autoFocus
            value={search}
            onChange={setSearch}
            mb={2}
          />
          <ZapTokenList entries={entries} />
        </Box>
      </Box>
    </Modal>
  )
}

export default ZapTokensModal
