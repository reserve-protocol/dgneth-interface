import { ReactNode, useCallback, useState } from 'react'

import Popover, { PopoverProps } from '../popover'
import { Box, BoxProps } from 'theme-ui'

const TooltipContainer = (props: BoxProps) => (
  <Box
    {...props}
    sx={{
      maxWidth: '340px',
      padding: '0.8rem 1rem',
      fontWeight: 400,
      wordBreak: 'break-word',
      color: 'text',
      backgroundColor: 'backgroundNested',
      border: '1px solid var(--theme-ui-colors-inputBorder)',
      boxShadow: '0px 4px 24px var(--theme-ui-colors-contentBackground)',
      borderRadius: '8px',
    }}
  />
)

interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: ReactNode
  disableHover?: boolean // disable the hover and content display
  onClose?: () => void
}

interface TooltipContentProps extends Omit<PopoverProps, 'content'> {
  content: ReactNode
  onOpen?: () => void
  // whether to wrap the content in a `TooltipContainer`
  wrap?: boolean
  disableHover?: boolean // disable the hover and content display
}

export default function Tooltip({ text, ...rest }: TooltipProps) {
  return (
    <Popover
      content={text && <TooltipContainer>{text}</TooltipContainer>}
      {...rest}
    />
  )
}

function TooltipContent({
  content,
  wrap = false,
  ...rest
}: TooltipContentProps) {
  return (
    <Popover
      content={wrap ? <TooltipContainer>{content}</TooltipContainer> : content}
      {...rest}
    />
  )
}

/** Standard text tooltip. */
export function MouseoverTooltip({
  text,
  disableHover,
  onClose: closeCallback = undefined,
  children,
  ...rest
}: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => {
    setShow(true)
    closeCallback?.()
  }, [setShow, closeCallback])
  const close = useCallback(() => {
    setShow(false)
  }, [setShow])
  return (
    <Tooltip {...rest} show={show} text={disableHover ? null : text}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </Tooltip>
  )
}

/** Tooltip that displays custom content. */
export function MouseoverTooltipContent({
  content,
  children,
  onOpen: openCallback = undefined,
  disableHover,
  ...rest
}: Omit<TooltipContentProps, 'show'>) {
  const [show, setShow] = useState(false)
  const open = useCallback(() => {
    setShow(true)
    openCallback?.()
  }, [openCallback])
  const close = useCallback(() => setShow(false), [setShow])
  return (
    <TooltipContent
      {...rest}
      show={show}
      content={disableHover ? null : content}
    >
      <div
        style={{ display: 'inline-block', lineHeight: 0, padding: '0.25rem' }}
        onMouseEnter={open}
        onMouseLeave={close}
      >
        {children}
      </div>
    </TooltipContent>
  )
}
