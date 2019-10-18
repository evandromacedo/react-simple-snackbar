import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function Teste() {
  // const [open] = useSnackbar({
  //   style: {
  //     backgroundImage: 'linear-gradient(to bottom right, #00b3f1, #2e62b7, #540055)',
  //   },
  // })
  const [open] = useSnackbar({
    position: 'top-right',
  })

  return (
    <button onClick={() => open('This is an example of a simple Snackbar.')}>
      Click me to open the Snackbar!
    </button>
  )
}
