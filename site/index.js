import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import SnackbarProvider, { useSnackbar } from 'react-simple-snackbar'

console.log(useSnackbar)

function App() {
  return (
    <SnackbarProvider>
      <Button />
    </SnackbarProvider>
  )
}

function Button() {
  const [open, close] = useSnackbar()

  return <button onClick={() => open(<p>Junior bassssssss</p>)}>Open Snackbar</button>
}

ReactDOM.render(<App />, document.getElementById('root'))
