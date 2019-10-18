import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function Teste() {
  const [open] = useSnackbar({
    style: {
      backgroundImage: 'linear-gradient(to bottom right, #00b3f1, #2e62b7, #540055)',
    },
  })

  return (
    <button
      onClick={() =>
        open('To achando esse texto da snackbar tão apagado agora!', 3000000)
      }
    >
      Trigger Snackbar
    </button>
  )
}
