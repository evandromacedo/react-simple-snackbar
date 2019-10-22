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
  <a href="#" title="Gzipped size">
    <img
      src="https://img.badgesize.io/evandromacedo/react-simple-snackbar/master/dist/index.js.svg?compression=gzip"
      alt="Gzipped size"
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

You can check a quick demo [here](https://link).

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

## API

### Methods

#### `open(node [, duration])`

- **`node`**: the node you want to show into the Snackbar. It can be just `"Some string like showed on Basic Usage"`, or `<p>Some element you would <strong>like</strong> to show</p>`.

- **`duration`**: a number in milliseconds to set the duration of the Snackbar. The default value is `5000`.

#### `close()`

- This method is used if you want to close the Snackbar programmatically. It doesn't receive any params.

### Options

You can pass an options object to customize your Snackbar. This object can be passed either in `useSnackbar([options])` or as second argument of `withSnackbar(Component [, options])`. It accepts three options:

- **`position`**: a custom position for your Snackbar. The default value is `bottom-center`, and the possible values are `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center` and `bottom-right`.

- **`style`**: a [style object](https://reactjs.org/docs/dom-elements.html#style) with `camelCased` properties and string values. These styles are applied to the Snackbar itself.

- **`closeStyle`**: same as above, but the styles are applied to the close button. You can use font properties to style the `X` icon.

For example:

```jsx noLines
const options = {
  position: 'bottom-right',
  style: {
    backgroundColor: 'midnightblue',
    border: '2px solid lightgreen',
    color: 'lightblue',
    fontFamily: 'Menlo, monospace',
    fontSize: '20px',
    textAlign: 'center',
  },
  closeStyle: {
    color: 'lightcoral',
    fontSize: '16px',
  },
}

useSnackbar(options)
// or
withSnackbar(Component, options)
```

## Contributing

See [CONTRIBUTING.md](https://github.com/evandromacedo/react-simple-snackbar/blob/master/CONTRIBUTING.md) for more information on how to get started.

## License

React Simple Snackbar is open source software [licensed as MIT](https://github.com/evandromacedo/react-simple-snackbar/blob/master/LICENSE.md).

<!-- _Add size, gzipped size, and npm version afterwards. Use [these](https://github.com/ngryman/badge-size) for size._

It's meant to be a REALLY simple Snackbar. -->
