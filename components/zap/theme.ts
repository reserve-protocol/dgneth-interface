import type { Theme } from 'theme-ui'
import 'react-loading-skeleton/dist/skeleton.css'

export const boxShadow = '0px 10px 20px var(--theme-ui-colors-shadow)'
export const transition = 'all .2s ease'
export const centeredContent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}
export const borderRadius = {
  inputs: 6,
  boxes: 16,
  inner: '4px',
  buttons: '100px',
}
export const baseButton = {
  borderRadius: borderRadius.buttons,
  fontWeight: 'bold',
  cursor: 'pointer',
  backgroundColor: 'primary',
  color: 'text',
  padding: '12px 16px',

  '&:hover': {
    filter: 'brightness(0.85)',
  },
  '&:disabled': {
    backgroundColor: 'disabled',
    cursor: 'default',
    color: '#484848',
    border: 'none',
  },
}

const baseBadge = {
  color: 'text',
  backgroundColor: 'border',
  fontWeight: 700,
  borderRadius: 30,
  padding: '6px 14px',
}

export const baseInput = {
  fontFamily: 'body',
  borderColor: 'focusBox',
  backgroundColor: 'background',
  outline: 'none',
  padding: '14px',
  paddingLeft: '16px',
  borderRadius: borderRadius.inputs,
  mozAppearance: 'none',
  webkitAppearance: 'none',
  '&:disabled': {
    backgroundColor: 'border',
    borderColor: 'secondary',
    cursor: 'default',
  },
  '&:hover': {
    backgroundColor: 'background',
  },
  '&:focus': {
    backgroundColor: 'background',
  },
}

export const smallButton = {
  fontSize: 1,
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: '10px',
  paddingRight: '10px',
  borderRadius: 6,
}

export const mediumButton = {
  padding: ['4px 10px 4px 10px', '12px 16px 12px 16px'],
  fontSize: [1, 2],
  borderRadius: borderRadius.inputs,
}

export const colors = {
  base: '#2852F5',
  text: '#000',
  shadow: 'rgba(0, 0, 0, 0.05)',
  invertedText: '#FFFFFF',
  secondaryText: '#666666',
  lightText: '#808080',
  background: '#181818',
  // background: '#fff',
  backgroundNested: '#FEFBF8',
  focusedBackground: '#FFFFFF',
  inputBackground: '#E5E5E5',
  inputAlternativeBackground: '#f2f2f2',
  // contentBackground: '#F9F8F4',
  lightGrey: '#f2f2f2',
  focusBox: '#0F0818',
  contentBackground: '#0E0E0E',
  contentLightBackground: 'rgba(249, 248, 244, 0.5)',
  primary: '#B090EF',
  success: '#11BB8D',
  accentAction: '#106D46',
  accentBG: '#D5DBE7',
  accentText: '#00814B',
  secondary: '#30263D',
  secondaryBackground: '#E5E5E5',
  rBlue: '#2150A9', // TODO: Remove in favor for accent
  accent: '#2150A9',
  accentInverted: '#2150A9', // Change to white on darkmode
  rBlueLight: '#DBE3F1',
  border: '#E5E5E5',
  borderFocused: '#F8EDDA',
  borderSecondary: '#E5E5E5',
  darkBorder: '#E0D5C7',
  inputBorder: '#D5D5D5',
  info: '#20678E',
  infoBG: 'rgba(32, 103, 142, 0.15)',
  disabled: '#D9D9D9',
  danger: '#FF0000',
  dangerBG: 'rgba(255, 0, 0, 0.15)',
  muted: '#A4A4A4',
  warning: '#FF8A00',
  modalOverlay: 'rgba(0, 0, 0, 0.2)',
  cardAlternative: '#190E28',
}

export const theme: Theme = {
  breakpoints: ['52em', '64em', '72em', '100em'],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 80, 256], // 0-9
  fonts: {
    body: 'Satoshi, sans-serif, -apple-system, BlinkMacSystemFont',
    // heading: 'inherit',
    monospace: 'Menlo, monospace',
    fontDisplay: 'swap',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 42, 56, 96],
  fontWeights: {
    body: 400,
    heading: 500,
    bold: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors,
  text: {
    hero: {
      fontSize: 6,
      fontWeight: 700,
      display: 'block',
      color: 'primary',
    },
    subtitle: {
      fontSize: 2,
      display: 'block',
      color: 'secondaryText',
    },
    title: {
      fontSize: 3,
      fontWeight: 500,
      display: 'block',
    },
    sectionTitle: {
      fontSize: 4,
      fontWeight: 700,
      display: 'block',
    },
    pageTitle: {
      fontSize: 5,
      fontWeight: 600,
      letterSpacing: '0.01em',
      display: 'block',
    },
    contentTitle: {
      color: 'lightText',
      display: 'block',
      fontSize: 1,
    },
    strong: {
      fontWeight: 500,
      display: 'block',
    },
    bold: {
      fontWeight: 700,
      display: 'block',
    },
    primary: {
      color: 'text',
    },
    warning: {
      color: 'warning',
    },
    error: {
      color: 'danger',
    },
    legend: {
      color: 'secondaryText',
    },
    accent: {
      color: 'primary',
      fontWeight: 700,
    },
    muted: {
      color: 'muted',
    },
    a: {
      transition,
      color: 'lightText',
      textDecoration: 'underline',
      cursor: 'pointer',
      '&:hover': {
        color: 'text',
      },
    },
  },
  styles: {
    ul: {
      listStyle: 'none',
      margin: 0,
    },
    li: {
      listStyle: 'none',
    },
    a: {
      transition,
      display: 'block',
      color: '#fff',
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover': {
        color: 'primary',
      },
    },
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    hr: {
      borderColor: 'border',
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5,
    },
    h2: {
      variant: 'text.heading',
      fontWeight: 500,
      color: 'red',
      fontSize: 4,
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3,
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2,
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1,
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0,
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
  },
  forms: {
    input: {
      ...baseInput,
    },
    smallInput: {
      ...baseInput,
      padding: '6px',
      paddingLeft: '6px',
    },
    select: {
      ...baseInput,
      backgroundColor: 'background',
    },
    inputError: {
      ...baseInput,
      borderColor: 'danger',
      color: 'danger',
    },
    textarea: {
      ...baseInput,
      fontFamily: 'inherit',
      fontSize: 'inherit',
    },
    transparent: {
      fontFamily: 'body',
      padding: 0,
      outline: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      mozAppearance: 'none',
      webkitAppearance: 'none',
      fontWeight: 700,
      fontSize: 4,
    },
  },
  cards: {
    primary: {
      borderRadius: borderRadius.boxes,
      backgroundColor: 'contentBackground',
      color: '#fff',
      padding: 3,
    },
    form: {
      borderRadius: borderRadius.boxes,
      padding: 3,
      border: '3px solid',
      borderColor: 'borderFocused',
      backgroundColor: 'contentBackground',
    },
    inner: {
      borderRadius: borderRadius.inputs,
      padding: 0,
      width: '100%',
      height: 'fit-content',
      backgroundColor: 'backgroundNested',
    },
    section: {
      borderRadius: 0,
      padding: 4,
      width: '100%',
      background: 'background',
      ':hover': {
        background: 'border',
      },
    },
  },
  buttons: {
    primary: baseButton,
    blue: {
      ...baseButton,
      backgroundColor: 'rBlue',
    },
    accent: {
      ...baseButton,
      backgroundColor: '#fff',
    },
    accentAction: {
      ...baseButton,
      backgroundColor: 'accentBG',
      color: 'accent',
      fontWeight: 700,
      borderRadius: borderRadius.inner,
      '&:hover': {
        fontWeight: 700,
      },
    },
    bordered: {
      ...baseButton,
      border: '4px solid',
      padding: '8px 12px',
      color: '#000',
      backgroundColor: 'transparent',
      '&:hover': {
        color: 'secondary',
      },
    },
    transparent: {
      ...baseButton,
      backgroundColor: 'transparent',
      padding: 0,
      cursor: 'pointer',
      color: 'text',
    },
    hover: {
      ...baseButton,
      backgroundColor: 'transparent',
      border: '1px solid',
      borderColor: 'transparent',

      color: 'text',
      '&:hover': {
        backgroundColor: 'border',
      },
    },
    muted: {
      ...baseButton,
      backgroundColor: 'secondary',
      color: 'text',
    },
    danger: {
      ...baseButton,
      backgroundColor: 'dangerBG',
      color: 'danger',
    },
    error: {
      ...baseButton,
      '&:disabled': {
        backgroundColor: 'disabled',
        cursor: 'default',
        color: 'danger',
      },
    },
  },
  badges: {
    primary: baseBadge,
    muted: {
      ...baseBadge,
      color: 'text',
      backgroundColor: 'focusedBackground',
      border: '2px solid',
      borderColor: 'border',
    },
    info: {
      ...baseBadge,
      color: 'primary',
      backgroundColor: 'focusedBackground',
      border: '2px dashed',
      borderColor: 'border',
    },
    danger: {
      ...baseBadge,
      color: 'danger',
      backgroundColor: 'backgroundNested',
      border: '2px solid',
      borderColor: 'border',
    },
    success: {
      ...baseBadge,
      color: 'success',
      backgroundColor: 'focusedBackground',
      border: '2px solid',
      borderColor: 'border',
    },
  },
  layout: {
    wrapper: {
      maxWidth: '70em',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    container: {
      boxSizing: 'border-box',
      flexShrink: 0,
      paddingX: [1, 3],
      paddingY: [1, 6],
    },
    containerCompact: {
      boxSizing: 'border-box',
      flexShrink: 0,
      paddingX: [1, 6, 6, 8],
      paddingY: [1, 6],
    },
    borderBox: {
      border: '1px solid',
      borderColor: 'border',
      borderRadius: borderRadius.boxes,
      padding: 4,
    },
    card: {
      backgroundColor: 'contentBackground',
      borderRadius: borderRadius.boxes,
    },
    centered: {
      ...centeredContent,
      flexDirection: 'column',
    },
    verticalAlign: {
      display: 'flex',
      alignItems: 'center',
    },
    sticky: {
      position: 'sticky',
      top: 0,
    },
    stickyNoHeader: {
      position: 'sticky',
      top: ['72px', '96px', '112px'],
    },
    square: {
      marginX: 1,
      height: '4px',
      width: '4px',
      backgroundColor: 'lightText',
    },
    tokenView: {
      width: '100%',
      p: [1, 4],
    },
    sectionDivider: {
      mx: [-1, -3, -3, -3, -6],
      my: [3, 5],
      borderColor: 'border',
    },
  },
}
