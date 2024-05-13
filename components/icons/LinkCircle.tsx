import { SVGProps } from 'react'

const LinkCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#B090EF"
      fillRule="evenodd"
      d="M8 3.167A5.333 5.333 0 1 0 13.333 8.5a.667.667 0 0 1 1.334 0A6.667 6.667 0 1 1 8 1.833a.667.667 0 0 1 0 1.334Z"
      clipRule="evenodd"
    />
    <path
      fill="#B090EF"
      d="M11.085 1.873c.586-.034 1.752-.084 2.45.04.287.05.536.188.722.386l.006.006a1.3 1.3 0 0 1 .325.66c.123.698.073 1.864.039 2.45-.045.773-.971 1.09-1.495.566l-.82-.82-1.824 1.81a.677.677 0 0 1-.954-.962l1.82-1.807-.835-.834c-.524-.524-.207-1.45.566-1.495Z"
    />
  </svg>
)
export default LinkCircle
