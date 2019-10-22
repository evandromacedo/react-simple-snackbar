import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function LongText() {
  const [open] = useSnackbar()

  return (
    <button
      onClick={() =>
        open(
          'This Snackbar has 10 seconds of duration! The default duration is 5 seconds, but you can set however you want. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, cupiditate soluta. Dicta, nemo sapiente. Expedita maiores voluptatibus labore.',
          10000
        )
      }
    >
      Long Text and Duration
    </button>
  )
}
