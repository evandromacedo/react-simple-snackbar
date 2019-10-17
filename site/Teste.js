import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function Teste() {
  const [open, close] = useSnackbar()

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
