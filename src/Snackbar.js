import React, { createContext, useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Snackbar.css'

// Based on 'waait' package from Wes Bos
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

// Context
const SnackbarContext = createContext(null)

export default function Snackbar({ children }) {
  const [open, setOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const [text, setText] = useState(null)
  const [position, setPosition] = useState('bottom-center')
  const [customStyles, setCustomStyles] = useState({})
  const [closeCustomStyles, setCloseCustomStyles] = useState({})

  const openSnackbar = async (text, position, style, closeStyle, timeout) => {
    if (open === true) {
      setOpen(false)
      await wait(250)
    }

    setText(text)
    setPosition(position)
    setCustomStyles(style)
    setCloseCustomStyles(closeStyle)
    setOpen(true)
    clearTimeout(timeoutId)
    setTimeoutId(
      setTimeout(() => {
        setOpen(false)
      }, timeout)
    )
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
        className={`${styles['snackbar-wrapper']} ${
          styles[`snackbar-wrapper-${position}`]
        }`}
        classNames={{
          enter: `${styles['snackbar-enter']} ${styles[`snackbar-enter-${position}`]}`,
          enterActive: `${styles['snackbar-enter-active']} ${
            styles[`snackbar-enter-active-${position}`]
          }`,
          exitActive: `${styles['snackbar-exit-active']} ${
            styles[`snackbar-exit-active-${position}`]
          }`,
        }}
      >
        <div>
          <div className={styles.snackbar} style={customStyles}>
            <p className={styles.snackbar__text}>{text}</p>
            <div
              onClick={closeSnackbar}
              className={styles.snackbar__close}
              style={closeCustomStyles}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      </CSSTransition>
    </SnackbarContext.Provider>
  )
}

const CloseIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 12 12">
    <path
      fill="currentColor"
      d="M11.73 1.58L7.31 6l4.42 4.42-1.06 1.06-4.42-4.42-4.42 4.42-1.06-1.06L5.19 6 .77 1.58 1.83.52l4.42 4.42L10.67.52z"
      fillRule="evenodd"
    />
  </svg>
)

export const useSnackbar = ({
  position = 'bottom-center',
  style = {},
  closeStyle = {},
} = {}) => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)
  const open = (text, timeout = 5000) =>
    openSnackbar(text, position, style, closeStyle, timeout)

  return [open, closeSnackbar]
}
