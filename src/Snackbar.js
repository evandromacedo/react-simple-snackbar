import React, { createContext, useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Snackbar.css'

// Based on 'waait' package from Wes Bos
export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

// Context used by the custom hook useSnackbar()
const SnackbarContext = createContext(null)

export default function Snackbar({ children }) {
  // Current open state
  const [open, setOpen] = useState(false)
  // Current timeout ID
  const [timeoutId, setTimeoutId] = useState(null)
  // Snackbar's text
  const [text, setText] = useState(null)
  // Snackbar's position
  const [position, setPosition] = useState('bottom-center')
  // Custom styles for the snackbar itself
  const [customStyles, setCustomStyles] = useState({})
  // Custom styles for the close button
  const [closeCustomStyles, setCloseCustomStyles] = useState({})

  const triggerSnackbar = (text, position, style, closeStyle, duration) => {
    setText(text)
    setPosition(position)
    setCustomStyles(style)
    setCloseCustomStyles(closeStyle)
    setOpen(true)
    clearTimeout(timeoutId)
    setTimeoutId(
      setTimeout(() => {
        setOpen(false)
      }, duration)
    )
  }

  // Manages all the snackbar's opening process
  const openSnackbar = (text, position, style, closeStyle, duration) => {
    // Closes the snackbar if it is already open
    if (open === true) {
      setOpen(false)
      setTimeout(() => {
        triggerSnackbar(text, position, style, closeStyle, duration)
      }, 250)
      // return
    } else {
      triggerSnackbar(text, position, style, closeStyle, duration)
    }
  }

  // Closes the snackbar just by setting the "open" state to false
  const closeSnackbar = () => {
    setOpen(false)
  }

  // Returns the Provider that must wrap the application
  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}

      {/* Renders Snackbar on the end of the page */}
      <CSSTransition
        in={open}
        timeout={150}
        mountOnEnter
        unmountOnExit
        // Sets custom classNames based on "position"
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
        {/* This div will be rendered with CSSTransition classNames */}
        <div>
          <div className={styles.snackbar} style={customStyles}>
            {/* Snackbar's text */}
            <p className={styles.snackbar__text}>{text}</p>

            {/* Snackbar's close button */}
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

// CloseIcon SVG is styled with font properties
const CloseIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 12 12">
    <path
      fill="currentColor"
      d="M11.73 1.58L7.31 6l4.42 4.42-1.06 1.06-4.42-4.42-4.42 4.42-1.06-1.06L5.19 6 .77 1.58 1.83.52l4.42 4.42L10.67.52z"
      fillRule="evenodd"
    />
  </svg>
)

// Possible snackbar's position
export const positions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
]

export const defaultPosition = 'bottom-center'
export const defaultDuration = 5000

// Custom hook that manages snackbar's context
// Receives snackbar's properties and wraps the openSnackbar method
export const useSnackbar = ({
  position = defaultPosition,
  style = {},
  closeStyle = {},
} = {}) => {
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext)

  // If no correct position is passed, 'bottom-center' is set
  if (!positions.includes(position)) {
    position = defaultPosition
  }

  const open = (text = '', duration = defaultDuration) => {
    // console.log(duration)
    openSnackbar(text, position, style, closeStyle, duration)
  }

  // Returns methods in hooks array way
  return [open, closeSnackbar]
}
