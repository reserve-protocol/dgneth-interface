import { FC, useState } from 'react'
import { Box } from 'theme-ui'
import Button from '.'

type ButtonGroupItem = {
  label: string
  onClick: () => void
}

type ButtonGroupProps = {
  buttons: ButtonGroupItem[]
  startActive?: number
}

const ButtonGroup: FC<ButtonGroupProps> = ({ buttons, startActive = 0 }) => {
  const [active, setActive] = useState(startActive)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'focusBox',
        gap: '2px',
        p: '2px',
        width: 'fit-content',
      }}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          onClick={() => {
            setActive(index)
            button.onClick()
          }}
          sx={{
            backgroundColor: index === active ? '#fff' : 'transparent',
            color: index === active ? 'text' : '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            padding: '8px 12px',
            fontSize: 14,
            whiteSpace: 'nowrap',
            '&:hover': {
              backgroundColor: '#fff',
              color: 'text',
            },
          }}
        >
          {button.label}
        </Button>
      ))}
    </Box>
  )
}

export default ButtonGroup
