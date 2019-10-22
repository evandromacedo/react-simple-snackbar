import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function CustomStyles() {
  const [open] = useSnackbar({
    style: {
      fontFamily: 'Menlo, monospace',
      backgroundImage: 'linear-gradient(to bottom right, #00b3f1, #2e62b7, #540055)',
    },
    closeStyle: {
      fontSize: '2rem',
      color: 'lightblue',
    },
  })

  return (
    <button onClick={() => open('This is an example of a styled Snackbar.')}>
      Custom Styles
    </button>
  )
}
