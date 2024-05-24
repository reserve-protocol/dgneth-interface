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
import { WagmiProvider, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { theme } from '../components/zap/theme'

const config = getDefaultConfig({
  appName: 'degenETH Interface',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet],
  transports: process.env.NEXT_PUBLIC_RPC
    ? {
        [mainnet.id]: http(process.env.NEXT_PUBLIC_RPC),
      }
    : undefined,
  ssr: true,
})

const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeUIProvider theme={theme}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider theme={darkTheme()}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeUIProvider>
  )
}

export default MyApp
