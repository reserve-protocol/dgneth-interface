import * as React from 'react'
import { SVGProps } from 'react'
const X = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M.571.854A.65.65 0 0 1 1.15.5H4.4c.209 0 .405.1.527.27l3.097 4.287L12.39.69a.65.65 0 1 1 .92.92L8.795 6.125l4.582 6.345a.65.65 0 0 1-.527 1.03H9.6a.65.65 0 0 1-.527-.27L5.976 8.944 1.61 13.31a.65.65 0 0 1-.92-.92l4.515-4.515L.623 1.531A.65.65 0 0 1 .571.854Z"
    />
  </svg>
)
export default X
