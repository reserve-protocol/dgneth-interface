import { useState } from 'react'
import { ButtonProps, IconButton } from 'theme-ui'
import { MouseoverTooltip } from './zap/components/tooltip'
import CopyIcon from './icons/CopyIcon'
import dynamic from 'next/dynamic'

interface Props extends ButtonProps {
  text?: string
  value: string
  size?: number
}

const CopyValue = ({ text, value, size = 16, ...props }: Props) => {
  const copyText = text || `Copy to clipboard`
  const confirmText = `Copied to clipboard!`
  const [displayText, setDisplayText] = useState(copyText)

  const handleClose = () => {
    setDisplayText(copyText)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setDisplayText(confirmText)
  }

  return (
    <MouseoverTooltip onClose={handleClose} text={displayText}>
      <IconButton
        p={0}
        variant="layout.verticalAlign"
        sx={{ cursor: 'pointer', width: 'auto', height: 'auto' }}
        onClick={(e) => {
          e.stopPropagation()
          handleCopy()
        }}
        {...props}
      >
        <CopyIcon />
      </IconButton>
    </MouseoverTooltip>
  )
}

export default dynamic(() => Promise.resolve(CopyValue), {
  ssr: false,
})
