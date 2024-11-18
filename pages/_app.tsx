import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeUIProvider } from 'theme-ui'
import { WagmiProvider, http, unstable_connector } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { theme } from '../components/zap/theme'
import Head from 'next/head'
import { fallback } from 'viem'
import { injected } from 'wagmi/connectors'
import Updater from '../views/app/state/Updater'
import ApyUpdater from '../views/app/state/ApyUpdater'

const config = getDefaultConfig({
  appName: 'degenETH Interface',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? 'YOUR_PROJECT_ID',
  chains: [mainnet],
  transports: process.env.NEXT_PUBLIC_RPC
    ? {
        [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC),
      }
    : {
        [mainnet.id]: fallback([
          unstable_connector(injected),
          http('https://mainnet.infura.io/v3/b6bf7d3508c941499b10025c0776eaf8'),
          http('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'),
          http(
            `https://arb-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
          ),
          http(),
        ]),
      },
  ssr: true,
})

const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeUIProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider theme={darkTheme()}>
            <Head>
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta name="theme-color" content="#000000" />
              <meta
                name="description"
                content="Degen ETH is a high-yield diversified ETH strategy index designed to sustainably outperform LST market yields."
              />
              <link rel="icon" href="/favicon.ico" />
              <link rel="apple-touch-icon" href="/logo192.png" />
              <link rel="manifest" href="/manifest.json" />

              <meta
                property="og:title"
                content="Degen ETH - High-Yield ETH Strategy"
              />
              <meta
                property="og:description"
                content="Degen ETH uses a two-token model: dgnETH and sdgnETH to provide high yield on your ETH investments through diversified DeFi strategies."
              />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://degeneth.com/" />
              <meta
                property="og:image"
                content="https://degeneth.com/logo192.png"
              />
              <meta property="og:site_name" content="Degen ETH" />

              <meta name="twitter:card" content="summary_large_image" />
              <meta
                name="twitter:title"
                content="Degen ETH - High-Yield ETH Strategy"
              />
              <meta
                name="twitter:description"
                content="Degen ETH uses a two-token model: dgnETH and sdgnETH to provide high yield on your ETH investments through diversified DeFi strategies."
              />
              <meta
                name="twitter:image"
                content="https://degeneth.com/logo192.png"
              />

              <title>Degen ETH - High-Yield ETH Strategy</title>
            </Head>
            <Updater />
            <ApyUpdater />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeUIProvider>
  )
}

export default MyApp
