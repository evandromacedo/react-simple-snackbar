import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function Default() {
  const [open] = useSnackbar()

  return (
    <button onClick={() => open('This is an example of a default Snackbar.')}>
      Default
    </button>
  )
}
