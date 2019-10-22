<p align="center">
  <img src="./Logo.png" alt="React Simple Snackbar Logo">
</p>

<p align="center">
  <a
    href="https://travis-ci.org/evandromacedo/react-simple-snackbar"
    title="Build Status"
    target="blank"
  >
    <img
      src="https://travis-ci.org/evandromacedo/react-simple-snackbar.svg?branch=master"
      alt="Build Status"
    />
  </a>
  <a
    href="https://coveralls.io/github/evandromacedo/react-simple-snackbar?branch=master"
    title="Coverage Status"
    target="blank"
  >
    <img
      src="https://coveralls.io/repos/github/evandromacedo/react-simple-snackbar/badge.svg?branch=master"
      alt="Coverage Status"
    />
  </a>
  <a href="https://standardjs.com" title="JavaScript Style Guide" target="blank">
    <img
      src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"
      alt="JavaScript Style Guide"
    />
  </a>
  <a
    href="https://github.com/evandromacedo/react-simple-snackbar/blob/master/LICENSE.md"
    title="MIT License"
    target="blank"
  >
    <img
      src="https://img.shields.io/npm/l/@testing-library/react-hooks.svg"
      alt="MIT License"
    />
  </a>
</p>

To see a quick demo you can check on the site.

## Getting Started

### Installation

```
npm install --save react-simple-snackbar
```

or

```
yard add react-simple-snackbar
```

### Basic Usage

First, you need to wrap your application into a `SnackbarProvider`:

```jsx
// App.js
import React from 'react'
import SnackbarProvider from 'react-simple-snackbar'
import Example from './Example'

export default function App() {
  return (
    <SnackbarProvider>
      <Example />
    </SnackbarProvider>
  )
}
```

Then you can use both options:

#### 1. `useSnackbar()` hook on function components

```jsx
// Example.js
import React from 'react'
import { useSnackbar } from 'react-simple-snackbar'

export default function Example() {
  const [open, close] = useSnackbar()

  return (
    <div>
      <button onClick={() => open('This is an example of a simple Snackbar.')}>
        Click me to open the Snackbar!
      </button>
      <button onClick={close}>Click me to close the Snackbar programmatically.</button>
    </div>
  )
}
```

#### 2. `withSnackbar()` HoC on class components

```jsx
// Example.js
import React from 'react'
import { withSnackbar } from 'react-simple-snackbar'

class Example extends React.Component {
  render() {
    const { open, close } = this.props

    return (
      <div>
        <button onClick={() => open('This is an example of a simple Snackbar.')}>
          Click me to open the Snackbar!
        </button>
        <button onClick={close}>Click me to close the Snackbar programmatically.</button>
      </div>
    )
  }
}

export default withSnackbar(Example)
```

<!-- _Add size, gzipped size, and npm version afterwards. Use [these](https://github.com/ngryman/badge-size) for size._

It's meant to be a REALLY simple Snackbar. -->
