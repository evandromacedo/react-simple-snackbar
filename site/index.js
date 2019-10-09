import React from 'react'
import ReactDOM from 'react-dom'
import ReactSimpleSnackbar from 'react-simple-snackbar'

class App extends React.Component {
  render() {
    return <ReactSimpleSnackbar />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
