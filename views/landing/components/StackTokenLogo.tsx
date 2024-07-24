import React from 'react'
import { Box, BoxProps } from 'theme-ui'
import TokenLogo from '../../../components/zap/components/icons/TokenLogo'

interface Props extends BoxProps {
  tokens: string[]
  size?: number
}

const StackTokenLogo = ({ tokens, sx = {}, size, ...props }: Props) => {
  return (
    <Box
      variant="layout.verticalAlign"
      sx={{ position: 'relative', ...sx }}
      {...props}
    >
      {tokens.map((tokenSymbol, index) => (
        <Box
          key={tokenSymbol}
          sx={{
            position: 'relative',
            left: index ? `${-(size ? size / 2 : 6)}px` : 0,
            marginRight: index ? `${-(size ? size / 2 : 6)}px` : 0,
            zIndex: tokens.length - index,
          }}
        >
          <TokenLogo width={size} symbol={tokenSymbol?.toLowerCase()} />
        </Box>
      ))}
    </Box>
  )
}

export default StackTokenLogo
