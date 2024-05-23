import { useCallback, useState } from 'react'
import { useAtomValue } from 'jotai'
import Button from '../../../zap/components/button'
import { TOKEN } from '../../constants'
import { isStakingAtom, isValidStakeAmountAtom } from '../../atoms'
import StakeModal from './StakeModal'

const StakeButton = () => {
  const [isOpen, setOpen] = useState(false)
  const isStaking = useAtomValue(isStakingAtom)
  const isValid = useAtomValue(isValidStakeAmountAtom)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <>
      <Button fullWidth disabled={!isValid} onClick={handleOpen}>
        {isStaking ? 'Stake' : 'Unstake'} {TOKEN.symbol}
      </Button>
      {isOpen && <StakeModal onClose={handleClose} />}
    </>
  )
}

export default StakeButton
