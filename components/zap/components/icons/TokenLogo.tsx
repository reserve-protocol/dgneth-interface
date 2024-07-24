import React from 'react'
import { Box, BoxProps, Image } from 'theme-ui'
import ChainLogo from './logos/ChainLogo'

interface Props extends BoxProps {
  symbol?: string
  width?: number | string
  src?: string
  chain?: number
  bordered?: boolean
}

const IMGS = new Set([
  'cbeth',
  'dai',
  'eth',
  'frax',
  'usdbc',
  'usdc',
  'usdt',
  'weth',
  'wbtc',
  'wsteth',
  'dgneth',
  'rsr',
  'eth+',
])

// Memoized token image
// eslint-disable-next-line react/display-name
const TokenImage = React.memo(
  ({
    src = '/svgs/defaultLogo.svg',
    width = 20,
  }: {
    src?: string
    width?: number | string
  }) => {
    return (
      <Image
        src={src}
        alt="token logo"
        sx={{ height: 'auto', width: width }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null // prevents looping
          currentTarget.src = '/svgs/defaultLogo.svg'
        }}
      />
    )
  }
)

const TokenLogo = ({
  symbol,
  src,
  chain,
  width = 20,
  bordered = false,
  sx = {},
  ...props
}: Props) => {
  let imgSrc = src
  let tokenSymbol = symbol

  if (tokenSymbol?.endsWith('-VAULT')) {
    tokenSymbol = tokenSymbol.replace('-VAULT', '')
  }

  if (!imgSrc && tokenSymbol && IMGS.has(tokenSymbol.toLowerCase())) {
    imgSrc = `/svgs/${tokenSymbol.toLowerCase()}.svg`
  }

  return (
    <Box
      {...props}
      variant="layout.verticalAlign"
      sx={{
        position: 'relative',
        borderRadius: '50%',
        overflow: 'visible',
        flexShrink: 0,
        width: width,
        justifyContent: 'center',
        borderColor: 'text',
        border: bordered ? '0.5px solid' : 'none',
        ...sx,
      }}
    >
      <TokenImage src={imgSrc} width={width} />

      {!!chain && (
        <Box
          sx={{
            position: 'absolute',
            right: '-3px',
            flexShrink: 0,
            width: Number(width) / 2,
            bottom: '-10px',
          }}
        >
          <ChainLogo
            chain={chain}
            width={Number(width) / 2}
            height={Number(width) / 2}
          />
        </Box>
      )}
    </Box>
  )
}

export default TokenLogo
