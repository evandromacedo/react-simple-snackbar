import React, { createContext, useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Snackbar.css'

// Based on 'waait' package from Wes Bos
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

// Context
const SnackbarContext = createContext(null)

let customStyles
let customTimeout

export default function Snackbar({ className, children }) {
  const [open, setOpen] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const [text, setText] = useState(null)

  const triggerSnackbar = text => {
    setText(text)
    setOpen(true)
    clearTimeout(timeoutId)
    setTimeoutId(
      setTimeout(() => {
        setOpen(false)
      }, customTimeout)
    )
  }

  const openSnackbar = async text => {
    if (open === true) {
      setOpen(false)
      await wait(250)
    }

    triggerSnackbar(text)
  }

  const closeSnackbar = () => {
    setOpen(false)
  }

  let classNames = styles['snackbar-inner']
  classNames += className ? ` ${className}` : ''

  const providerValue = [openSnackbar, closeSnackbar]

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
          <div className={classNames} style={customStyles}>
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
  <svg
    className={styles['snackbar-inner__close-svg']}
    width="1em"
    height="1em"
    viewBox="0 0 12 12"
  >
    <path
      d="M11.657 1.757L7.414 6l4.243 4.243-1.414 1.414L6 7.414l-4.243 4.243-1.414-1.414L4.586 6 .343 1.757 1.757.343 6 4.586 10.243.343z"
      fill="#FFF"
      fillRule="evenodd"
    />
  </svg>
)

export const useSnackbar = ({ styles = {}, timeout = 3000 } = {}) => {
  customStyles = styles
  customTimeout = timeout

  return useContext(SnackbarContext)
}
