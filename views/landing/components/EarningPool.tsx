import Link from 'next/link'
import { ArrowUpRight } from 'react-feather'
import { Box, Text } from 'theme-ui'
import { colors } from '../../../components/zap/theme'
import StackTokenLogo from './StackTokenLogo'
import Yearn from './logos/Yearn'
import Convex from './logos/Convex'
import Curve from './logos/Curve'
import Aerodrome from './logos/Aerodrome'
import Stakedao from './logos/Stakedao'
import Uniswap from './logos/Uniswap'
import Balancer from './logos/Balancer'
import Extra from './logos/Extra'
import Camelot from './logos/Camelot'
import Beefy from './logos/Beefy'
import Concentrator from './logos/Concentrator'
import Dyson from './logos/Dyson'
import MorphoBlue from './logos/MorphoBlue'
import Merkl from './logos/Merkl'
import useBestEarnPool from '../hooks/useBestEarnPool'
import { formatCurrency } from '../../../components/zap/utils'
import { useMemo } from 'react'
import Skeleton from 'react-loading-skeleton'

const PROJECT_ICONS: Record<string, React.ReactElement> = {
  'yearn-finance': <Yearn fontSize={16} />,
  'convex-finance': <Convex fontSize={16} />,
  'curve-dex': <Curve />,
  'aerodrome-v1': <Aerodrome />,
  stakedao: <Stakedao fontSize={16} />,
  'uniswap-v3': <Uniswap fontSize={16} />,
  'balancer-v2': <Balancer fontSize={16} />,
  'extra-finance': <Extra fontSize={16} />,
  'camelot-v3': <Camelot />,
  beefy: <Beefy />,
  concentrator: <Concentrator />,
  dyson: <Dyson />,
  'morpho-blue': <MorphoBlue />,
  merkl: <Merkl />,
  'stake-dao': <Stakedao fontSize={16} />,
}

const PROJECT_NAMES: Record<string, string> = {
  'yearn-finance': 'Yearn',
  'convex-finance': 'Convex',
  'curve-dex': 'Curve',
  'aerodrome-v1': 'Aerodrome',
  stakedao: 'Stakedao',
  'uniswap-v3': 'Uniswap',
  'balancer-v2': 'Balancer',
  'extra-finance': 'Extra',
  'camelot-v3': 'Camelot',
  beefy: 'Beefy',
  concentrator: 'Concentrator',
  dyson: 'Dyson',
  'morpho-blue': 'Morpho Blue',
  merkl: 'Merkl',
  'stake-dao': 'Stake DAO',
}

const TOKENS: Record<string, string> = {
  '0x005f893ecd7bf9667195642f7649da8163e23658': 'dgnETH',
  '0xe72b141df173b999ae7c1adcbf60cc9833ce56a8': 'ETH+',
  '0x0000000000000000000000000000000000000000': 'ETH',
  '0x320623b8e4ff03373931769a31fc52a4e78b5d70': 'RSR',
}

const PoolImage = ({
  project,
  tokenSymbols,
}: {
  project: string
  tokenSymbols: string[]
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.00) 62.06%);',
        borderRadius: '6px',
        width: 90,
        height: 100,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: 20,
          position: 'absolute',
          left: '50%',
          top: '15%',
          transform: 'translateX(-50%)',
        }}
      >
        {PROJECT_ICONS[project]}
      </Box>
      <StackTokenLogo
        size={128}
        tokens={tokenSymbols}
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: '-5%',
          transform: 'translate(-50%, 50%)',
        }}
      />
    </Box>
  )
}

const EarningPool = () => {
  const pool = useBestEarnPool()

  const underlyingSymbols = useMemo(() => {
    return (
      pool?.underlyingTokens?.map(
        (address: string) => TOKENS[address.toLowerCase()]
      ) || []
    )
  }, [pool?.underlyingTokens])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: ['column', 'column', 'column', 'column', 'row'],
        minWidth: 250,
        height: [160, 160, 160, 160, 130],
        borderRadius: '16px',
        background:
          'linear-gradient(0deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%)',
        gap: '12px',
        '@media (min-width: 1380px) and (max-width: 1512px)': {
          flexDirection: 'row',
          height: 130,
        },
      }}
      p={3}
    >
      <Link href={pool?.url || ''} target="_blank">
        <Box variant="layout.verticalAlign" sx={{ gap: 3 }}>
          <Box sx={{ width: 100 }}>
            {pool ? (
              <PoolImage
                project={pool.project}
                tokenSymbols={underlyingSymbols}
              />
            ) : (
              <Skeleton height={100} width={90} baseColor={colors.primary} />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              gap: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <Text
              sx={{
                fontSize: ['14px', '14px', '14px', '14px', '16px'],
                mb: 'auto',
                fontWeight: 'bold',
                '@media (min-width: 1380px) and (max-width: 1512px)': {
                  fontSize: '16px',
                },
              }}
            >
              Already holding dgnETH?
            </Text>
            {pool ? (
              <Text
                sx={{
                  fontSize: ['32px', '32px', '32px', '32px', '42px'],
                  lineHeight: '38px',
                  fontWeight: 'bold',
                  '@media (min-width: 1380px) and (max-width: 1512px)': {
                    fontSize: '42px',
                  },
                }}
              >
                {formatCurrency(pool.apy, 2)}%{' '}
                <Text sx={{ opacity: 0.4 }}> APY</Text>
              </Text>
            ) : (
              <Skeleton height={40} width={200} baseColor={colors.primary} />
            )}
            {pool ? (
              <Text
                sx={{
                  fontSize: ['14px', '14px', '14px', '14px', '16px'],
                  '@media (min-width: 1380px) and (max-width: 1512px)': {
                    fontSize: '16px',
                  },
                }}
              >
                w. {underlyingSymbols.join(' & ')}
                <Text sx={{ display: ['none', 'inline'] }}>
                  {' '}
                  in {PROJECT_NAMES[pool?.project || '']}
                </Text>
              </Text>
            ) : (
              <Skeleton height={18} width={200} baseColor={colors.primary} />
            )}
          </Box>
        </Box>
      </Link>
      <Link href="https://app.reserve.org/earn" target="_blank">
        <Box
          sx={{
            display: 'flex',
            flexDirection: [
              'row-reverse',
              'row-reverse',
              'row-reverse',
              'row-reverse',
              'column',
            ],
            justifyContent: 'space-between',
            alignItems: 'space-between',
            gap: 1,
            height: '100%',
            '@media (min-width: 1380px) and (max-width: 1512px)': {
              flexDirection: 'column',
            },
          }}
        >
          <ArrowUpRight
            color={colors.darkerPrimary}
            size={24}
            style={{ marginLeft: 'auto', marginBottom: 'auto', opacity: 0.5 }}
          />
          <Text color="darkerPrimary" sx={{ mt: 'auto' }}>
            app.reserve.org/earn
          </Text>
        </Box>
      </Link>
    </Box>
  )
}

export default EarningPool
