import React, { createContext, useContext, useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import styles from './Snackbar.css'

// Based on 'waait' package from Wes Bos
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount))

// Context
const SnackbarContext = createContext(null)

// export default function Snackbar({ timeout = 3000, className, children }) {
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

  let classNames = styles.snackbar
  classNames += className ? ` ${className}` : ''

  return (
    <SnackbarContext.Provider value={[open, close]}>
      {children}
      <CSSTransition
        in={openState}
        timeout={200}
        mountOnEnter
        unmountOnExit
        className={classNames}
        classNames="snackbar"
        classNames={{
          enter: styles['snackbar-enter'],
          enterActive: styles['snackbar-enter-active'],
          exitActive: styles['snackbar-exit-active'],
        }}
      >
        <div>
          <div className={styles['snackbar-inner']}>
            {/* <div className={styles['snackbar-inner-text']}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eveniet at
              ullam suscipit neque animi ipsa ipsum numquam voluptatum porro consectetur
              libero, pariatur voluptate doloremque ab hic. Error, quam voluptatum.
            </div> */}
            <div className={styles['snackbar-inner-text']}>Lorem ipsum</div>
            {/* <div></div> */}
            {/* <div className={styles['snackbar-inner-actions']}>×</div> */}
            {/* <div className={styles['snackbar-inner-actions']}>╳</div> */}
            <div className={styles['snackbar-inner-actions']}>✕</div>
          </div>
        </div>
      </CSSTransition>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
