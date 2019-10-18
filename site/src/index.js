import React from 'react'
import { render } from 'react-dom'
import { MDXProvider } from '@mdx-js/react'
import SnackbarProvider from 'react-simple-snackbar'
import CodeBlock from './components/CodeBlock/CodeBlock'
import Header from './components/Header/Header'
import Page from './page.mdx'

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
}

render(
  <MDXProvider components={components}>
    <SnackbarProvider>
      <Header />
      <div className="container">
        <Page />
      </div>
    </SnackbarProvider>
  </MDXProvider>,
  document.querySelector('#root')
)
