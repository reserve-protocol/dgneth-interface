export const ChainId = {
  Mainnet: 1,
  Base: 8453,
}

// export const supportedChains = new Set(Object.values(ChainId))
export const supportedChains = new Set([ChainId.Mainnet])

const _defaultChain = Number(
  typeof window !== "undefined" ? new URL(window.location.href.replace('/#/', '/')).searchParams.get('chainId') : ChainId.Mainnet
)

export const defaultChain = supportedChains.has(_defaultChain)
  ? _defaultChain
  : ChainId.Mainnet
