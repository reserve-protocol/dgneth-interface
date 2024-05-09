import { useCallback, useState } from 'react'
import { TransactionButtonContainer } from '../../../zap/components/button/TransactionButton'
import { useAtomValue } from 'jotai'
import Button from '../../../zap/components/button'
import { TOKEN } from '../../constants'
import { isValidStakeAmountAtom } from '../../atoms'

const StakeButton = () => {
  const [isOpen, setOpen] = useState(false)
  const isValid = useAtomValue(isValidStakeAmountAtom)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <>
      <TransactionButtonContainer>
        <Button fullWidth disabled={!isValid} onClick={handleOpen}>
          Stake {TOKEN.symbol}
        </Button>
      </TransactionButtonContainer>
      {/* {isOpen && <StakeModal onClose={handleClose} />} */}
    </>
  )
}

export default StakeButton
