import { useAtomValue } from 'jotai'
import { Box, Card, Text } from 'theme-ui'
import {
  priceAtom,
  stakeRateAtom,
  stakeTokenSupplyAtom,
  tokenSupplyAtom,
} from '../state/atoms'
import { formatCurrency } from '../../../components/zap/utils'

const Supply = () => {
  const supply = useAtomValue(tokenSupplyAtom)
  const stakeSupply = useAtomValue(stakeTokenSupplyAtom)
  const price = useAtomValue(priceAtom)
  const rate = useAtomValue(stakeRateAtom)

  return (
    <Card>
      <Text>dgnETH Supply</Text>
      <Box mt="2" variant="layout.verticalAlign">
        <Text variant="bold" sx={{ width: 80 }}>
          {formatCurrency(supply, 2, {
            notation: 'compact',
            compactDisplay: 'short',
          })}
        </Text>
        <Text ml="4" variant="bold">
          $
          {formatCurrency(supply * price, 2, {
            notation: 'compact',
            compactDisplay: 'short',
          })}
        </Text>
        <Text sx={{ color: '#b2b2b2' }} ml="auto">
          Total supply
        </Text>
      </Box>
      <Box mt="2" variant="layout.verticalAlign">
        <Text variant="bold" sx={{ width: 80 }}>
          {formatCurrency(stakeSupply, 2, {
            notation: 'compact',
            compactDisplay: 'short',
          })}
        </Text>
        <Text ml="4" variant="bold">
          $
          {formatCurrency((stakeSupply / rate) * price, 2, {
            notation: 'compact',
            compactDisplay: 'short',
          })}
        </Text>
        <Text sx={{ color: '#b2b2b2' }} ml="auto">
          Staked
        </Text>
      </Box>
    </Card>
  )
}

export default Supply
