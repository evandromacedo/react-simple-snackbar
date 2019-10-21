import React from 'react'
import { SnackbarContext, defaultDuration, defaultPosition, positions } from './Snackbar'

export function withSnackbar(
  WrappedComponent,
  { position = defaultPosition, style = {}, closeStyle = {} } = {}
) {
  return class extends React.Component {
    static contextType = SnackbarContext

    constructor(props) {
      super(props)
      this.open = this.open.bind(this)
      this.close = this.close.bind(this)
    }

    open(text = '', duration = defaultDuration) {
      const { openSnackbar } = this.context

      // If no correct position is passed, 'bottom-center' is set
      if (!positions.includes(position)) {
        position = defaultPosition
      }

      openSnackbar(text, duration, position, style, closeStyle)
    }

    close() {
      const { closeSnackbar } = this.context
      closeSnackbar()
    }

    render() {
      return <WrappedComponent open={this.open} close={this.close} {...this.props} />
    }
  }
}
