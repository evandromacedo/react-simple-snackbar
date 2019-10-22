import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function CustomPosition() {
  const [open] = useSnackbar({
    position: 'top-left',
  })

  return (
    <button
      onClick={() => open('This is an example of a "top-left" positioned Snackbar.')}
    >
      Custom Position
    </button>
  )
}
