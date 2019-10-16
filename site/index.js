import React from 'react'
import { render } from 'react-dom'
import { MDXProvider } from '@mdx-js/react'
import SnackbarProvider from 'react-simple-snackbar'
import Content from './content.mdx'

render(
  <SnackbarProvider>
    <Content />
  </SnackbarProvider>,
  document.querySelector('#root')
)

// import React from 'react'
// import ReactDOM from 'react-dom'
// import SnackbarProvider, { useSnackbar } from 'react-simple-snackbar'

// function App() {
//   return (
//     <SnackbarProvider>
//       <ButtonOne />
//       <ButtonTwo />
//       <ButtonThree />
//     </SnackbarProvider>
//   )
// }

// function ButtonOne() {
//   const [open] = useSnackbar({
//     position: 'bottom-left',
//     style: {
//       color: 'green',
//       border: '2px solid yellow',
//       textAlign: 'center',
//     },
//   })

//   return (
//     <button
//       onClick={() =>
//         open('This is just some example text of the react-simple-snackbar.', 3000000)
//       }
//     >
//       First Snackbar
//     </button>
//   )
// }

// function ButtonTwo() {
//   const [open] = useSnackbar({
//     position: 'top-rightttt',
//     style: {
//       color: 'red',
//       border: '2px solid red',
//       background: 'white',
//     },
//     closeStyle: {
//       color: 'red',
//       fontSize: '18px',
//     },
//   })

//   return (
//     <button onClick={() => open('Another text of ButtonTwo')}>Second Snackbar</button>
//   )
// }

// function ButtonThree() {
//   const [open, close] = useSnackbar()

//   return (
//     <div>
//       <button onClick={() => open('Third Button')}>Third Snackbar</button>
//       <button onClick={() => close()}>Close!!</button>
//     </div>
//   )
// }

// ReactDOM.render(<App />, document.getElementById('root'))
