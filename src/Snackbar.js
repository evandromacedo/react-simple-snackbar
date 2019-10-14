import React, { createContext, useEffect, useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Snackbar.css'

// Based on 'waait' package from Wes Bos
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

// Context
const SnackbarContext = createContext(null)

export default function Snackbar({ className, children }) {
  const [open, setOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const [text, setText] = useState(null)
  const [customStyles, setCustomStyles] = useState({})

  const triggerSnackbar = (text, styles, timeout) => {
    setText(text)
    setCustomStyles(styles)
    setOpen(true)
    clearTimeout(timeoutId)
    setTimeoutId(
      setTimeout(() => {
        setOpen(false)
      }, timeout)
    )
  }

  const openSnackbar = async (text, styles, timeout) => {
    if (open === true) {
      setOpen(false)
      await wait(250)
    }

    triggerSnackbar(text, styles, timeout)
  }

  const closeSnackbar = () => {
    setOpen(false)
  }

  const providerValue = { openSnackbar, closeSnackbar }

  return (
    <SnackbarContext.Provider value={providerValue}>
      {children}
      <CSSTransition
        in={open}
        timeout={150}
        mountOnEnter
        unmountOnExit
        className={styles.snackbar}
        classNames={{
          enter: styles['snackbar-enter'],
          enterActive: styles['snackbar-enter-active'],
          exitActive: styles['snackbar-exit-active'],
        }}
      >
        <div>
          <div className={styles['snackbar-inner']} style={customStyles}>
            <p className={styles['snackbar-inner__text']}>{text}</p>
            <div onClick={closeSnackbar} className={styles['snackbar-inner__close']}>
              <CloseIcon />
            </div>
          </div>
        </div>
      </CSSTransition>
    </SnackbarContext.Provider>
  )
}

const CloseIcon = () => (
  <>
    <svg
      className={styles['snackbar-inner__close-svg']}
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
    >
      <path
        fill="#FFF"
        d="M11.73 1.58L7.31 6l4.42 4.42-1.06 1.06-4.42-4.42-4.42 4.42-1.06-1.06L5.19 6 .77 1.58 1.83.52l4.42 4.42L10.67.52z"
        fillRule="evenodd"
      />
    </svg>
  </>
)

export const useSnackbar = ({ styles = {}, timeout = 3000 } = {}) => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const open = text => openSnackbar(text, styles, timeout)

  return [open, closeSnackbar]
}
