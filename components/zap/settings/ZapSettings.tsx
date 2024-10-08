import { Settings } from 'react-feather'
import { IconButton } from 'theme-ui'
import { useZap } from '../context/ZapContext'
import ZapSettingsModal from './ZapSettingsModal'

const ZapSettings = () => {
  const { openSettings, setOpenSettings } = useZap()

  return (
    <>
      {openSettings && <ZapSettingsModal />}
      <IconButton
        sx={{
          cursor: 'pointer',
          width: '34px',
          border: '1px solid',
          borderColor: 'borderSecondary',
          borderRadius: '6px',
        }}
        onClick={() => setOpenSettings(true)}
      >
        <Settings size={16} strokeWidth={2.2} />
      </IconButton>
    </>
  )
}

export default ZapSettings
