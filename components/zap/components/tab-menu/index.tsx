import React, { useCallback, useMemo } from 'react'
import { Box, BoxProps, Text } from 'theme-ui'
import { borderRadius } from '../../theme'

interface Item {
  key: string | number
  label: string
  icon?: JSX.Element
}

interface Props extends BoxProps {
  items: Item[]
  onMenuChange(key: string): void
  active: string | number
  small?: boolean
  background?: string
  collapse?: boolean
}

const defaultStyles = (
  background: string,
  small: boolean,
  collapse: boolean
) => ({
  // border: '1px solid',
  // borderColor: 'border',
  color: 'secondaryText',
  fontSize: small ? 0 : 1,
  fontWeight: small ? 500 : 400,
  borderRadius: borderRadius.inputs,
  background: 'inputBackground',
  width: 'fit-content',
  '>div': {
    padding: small ? '6px' : '6px 8px 6px 8px',
    lineHeight: '16px',
    userSelect: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: borderRadius.inner,
    justifyContent: 'center',
    width: collapse ? [40, 'auto'] : 'auto',
    marginLeft: '2px',
    ':first-of-type': {
      marginLeft: 0,
    },
    ':hover': {
      backgroundColor: 'inputBorder',
    },
    '&.active': {
      backgroundColor: 'focusedBackground',
      color: 'accentInverted',
      fontWeight: 500,
    },
  },
})

const MenuItem = ({
  item,
  onClick,
  isActive,
  collapse,
}: {
  item: Item
  onClick(key: string | number): void
  isActive: boolean
  collapse: boolean
}) => {
  return (
    <div
      role="button"
      className={isActive ? 'active' : ''}
      onClick={() => onClick(item.key)}
    >
      {item.icon}
      <Text
        ml={!!item.icon ? '6px' : 0}
        sx={{ display: collapse ? ['none', 'none', 'block'] : 'block' }}
      >
        {item.label}
      </Text>
    </div>
  )
}

// Reusable implementation, different from token header as it doesnt relies on routes
// TODO: refactor header menu to not rely on react-router at least on the inner component level.
const TabMenu = ({
  items,
  onMenuChange,
  small = false,
  collapse = false,
  background = 'transparent',
  active,
  sx,
  ...props
}: Props) => {
  // TODO: Styles got a typing error, for some reason userSelect: 'none' is not valid?
  const styles: any = useMemo(() => {
    return {
      ...defaultStyles(background, small, collapse),
      ...(sx ?? {}),
    }
  }, [background, collapse, small, sx])

  const handleSelect = useCallback(
    (key: string) => {
      onMenuChange(key)
    },
    [onMenuChange]
  )

  return (
    <Box variant="layout.verticalAlign" p={'2px'} sx={styles} {...props}>
      {items.map((item) => (
        <MenuItem
          item={item}
          onClick={handleSelect}
          isActive={item.key === active}
          key={item.key}
          collapse={collapse}
        />
      ))}
    </Box>
  )
}

export default React.memo(TabMenu)
