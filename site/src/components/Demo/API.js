import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function API() {
  const options = {
    position: 'bottom-right',
    style: {
      backgroundColor: 'midnightblue',
      border: '2px solid lightgreen',
      color: 'lightblue',
      fontFamily: 'Menlo, monospace',
      fontSize: '20px',
      textAlign: 'center',
    },
    closeStyle: {
      color: 'lightcoral',
      fontSize: '16px',
    },
  }

  const [open] = useSnackbar(options)

  return (
    <button onClick={() => open('This is a fully customized Snackbar!')}>
      Click me!
    </button>
  )
}
