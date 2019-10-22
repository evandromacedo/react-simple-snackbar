import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function CustomDuration() {
  const [open] = useSnackbar()

  return (
    <button
      onClick={() => open('This is an example of a 2 second duration Snackbar.', 2000)}
    >
      Custom Duration
    </button>
  )
}
