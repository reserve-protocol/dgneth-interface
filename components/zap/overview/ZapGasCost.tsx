import GasIcon from '../components/icons/GasIcon'
import Skeleton from 'react-loading-skeleton'
import { Box, BoxProps, Text } from 'theme-ui'
import { useZap } from '../context/ZapContext'
import { formatCurrency } from '../utils'

const ZapGasCost = (props: BoxProps) => {
  const { gasCost, loadingZap } = useZap()

  return (
    <Box
      variant="layout.verticalAlign"
      sx={{ justifyContent: 'space-between' }}
      {...props}
    >
      <Text sx={{ fontSize: 14 }}>Estimated gas cost</Text>
      <Box variant="layout.verticalAlign" sx={{ gap: 1, color: 'primary' }}>
        <GasIcon />
        {loadingZap ? (
          <Skeleton height={10} width={60} />
        ) : (
          <Text sx={{ fontSize: 14, fontWeight: 500 }}>
            ${gasCost ? formatCurrency(+gasCost, 2) : 0}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default ZapGasCost
