import React, { createContext, useContext, useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Snackbar.css'
// import * as S from './styled'

// Based on 'waait' package from Wes Bos.
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

// Context
const SnackbarContext = createContext(null)

export default function Snackbar({ timeout = 3000, className, children }) {
  const [openState, setOpenState] = useState(false)
  const [snackbarTimeoutID, setSnackbarTimeoutID] = useState(null)
  const [node, setNode] = useState(null)

  useEffect(() => {
    console.log('Funfou!')
  }, [])

  const triggerSnackbar = node => {
    setNode(node)
    setOpenState(true)
    clearTimeout(snackbarTimeoutID)
    setSnackbarTimeoutID(
      setTimeout(() => {
        setOpenState(false)
      }, timeout)
    )
  }

  const open = async node => {
    if (openState === true) {
      setOpenState(false)
      await wait(250)
    }

    triggerSnackbar(node)
  }

  const close = () => {
    setOpenState(false)
  }

  return (
    <SnackbarContext.Provider value={[open, close]}>
      {children}
      <CSSTransition
        in={openState}
        timeout={500}
        mountOnEnter
        unmountOnExit
        className={className}
        classNames="snackbar"
      >
        <div className={styles.snackbar}>{node}</div>
      </CSSTransition>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
