import React, { SVGProps } from 'react'
import { ChainId } from '../../../utils/chains'
import Ethereum from './Ethereum'

export const chainIcons = {
  [ChainId.Mainnet]: Ethereum,
}

interface Props extends SVGProps<SVGSVGElement> {
  chain: number
}

const ChainLogo = ({ chain, ...props }: Props) => {
  const Icon = chainIcons[chain]

  return Icon ? <Icon {...props} /> : <></>
}

export default React.memo(ChainLogo)
