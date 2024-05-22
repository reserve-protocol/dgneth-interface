import { useAtomValue } from 'jotai'
import { Box, Card, Flex, Text } from 'theme-ui'
import { formatCurrency } from '../../../components/zap/utils'
import {
  balanceAtom,
  priceAtom,
  rTokenTargetPriceAtom,
  stakeBalanceAtom,
  stakeRateAtom,
} from '../state/atoms'

const Balances = () => {
  const balance = useAtomValue(balanceAtom)
  const stakeBalance = useAtomValue(stakeBalanceAtom)
  const price = useAtomValue(priceAtom)
  const rate = useAtomValue(stakeRateAtom)
  const peg = useAtomValue(rTokenTargetPriceAtom)

  return (
    <Card sx={{ flexGrow: 1 }}>
      <Text>Your dgnETH</Text>
      <Box
        mt={2}
        p={2}
        sx={{ borderRadius: '8px', backgroundColor: 'background' }}
      >
        <Flex>
          <Text>In wallet</Text>
          <Text ml="auto">${formatCurrency(+balance.formatted * price)}</Text>
        </Flex>
        <Flex>
          <Text variant="accent">{formatCurrency(+balance.formatted)}</Text>
          <Text variant="muted" ml="auto">
            {formatCurrency(+balance.formatted * peg.price)} ETH
          </Text>
        </Flex>
        <Flex mt={3}>
          <Text>Staked</Text>
          <Text ml="auto">
            ${formatCurrency((+stakeBalance.formatted / rate) * price)}
          </Text>
        </Flex>
        <Flex>
          <Text>{formatCurrency(+stakeBalance.formatted)}</Text>
          <Text variant="muted" ml="auto">
            {formatCurrency((+stakeBalance.formatted / rate) * peg.price)} ETH
          </Text>
        </Flex>
      </Box>
    </Card>
  )
}

export default Balances
