import { useContext } from 'react'
import { SnackbarContext, defaultDuration, defaultPosition, positions } from './Snackbar'

// Custom hook to trigger the snackbar on function components
export const useSnackbar = ({
  position = defaultPosition,
  style = {},
  closeStyle = {},
} = {}) => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)

  // If no correct position is passed, 'bottom-center' is set
  if (!positions.includes(position)) {
    position = defaultPosition
  }

  function open(text = '', duration = defaultDuration) {
    openSnackbar(text, duration, position, style, closeStyle)
  }

  // Returns methods in hooks array way
  return [open, closeSnackbar]
}
