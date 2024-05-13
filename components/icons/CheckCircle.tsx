import { SVGProps } from 'react'

const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#B090EF"
        d="M.833 8A7.167 7.167 0 1 0 14.24 4.473c-.163-.288-.245-.432-.397-.449-.153-.016-.27.114-.505.375l-4.842 5.38a.667.667 0 0 1-.967.026L5.195 7.47a.667.667 0 1 1 .943-.942l1.39 1.389c.21.21.314.315.443.311.129-.003.228-.113.427-.334l4.172-4.636c.187-.208.28-.311.27-.44-.01-.128-.112-.211-.316-.378A7.167 7.167 0 0 0 .834 8Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default CheckCircle
