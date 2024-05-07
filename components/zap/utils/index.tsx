export const formatNumber = (num: number, digits = 4) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}

export const formatSlippage = (bps: bigint) => {
  return `${formatNumber((1 / Number(bps)) * 100)}%`
}

export function formatCurrency(
  value: number,
  decimals = 2,
  options: Intl.NumberFormatOptions = {}
): string {
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimals,
    minimumFractionDigits: Math.min(2, decimals),
    ...options,
  }).format(value)
}

export function shortenString(str: string) {
  return `${str.substring(0, 6)}...${str.substring(str.length - 4)}`
}
