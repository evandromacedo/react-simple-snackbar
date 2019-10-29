import React from 'react'
import { act } from 'react-dom/test-utils'
import { renderHook } from '@testing-library/react-hooks'
import SnackbarProvider, { useSnackbar } from '..'
import { defaultPosition, defaultDuration, defaultInterval } from '../Snackbar'
import { mount } from 'enzyme'

const ComponentMock = ({
  text = '',
  duration = undefined,
  snackbarProperties = {},
} = {}) => {
  const [open, close] = useSnackbar(snackbarProperties)

  return (
    <div>
      <button data-test="open" onClick={() => open(text, duration)}>
        Open
      </button>
      <button data-test="close" onClick={() => close()}>
        Close
      </button>
    </div>
  )
}

const mountWithProvider = component => {
  return mount(<SnackbarProvider>{component}</SnackbarProvider>)
}

describe('useSnackbar()', () => {
  // Reset fake timers on each test
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('shoud return 2 functions in array on useSnackbar()', () => {
    // Necessary wrap the hook in the context
    const wrapper = ({ children }) => <SnackbarProvider>{children}</SnackbarProvider>
    const { result } = renderHook(() => useSnackbar(), { wrapper })
    const [open, close] = result.current
    expect(open).toBeInstanceOf(Function)
    expect(close).toBeInstanceOf(Function)
  })

  it('should render with default values when nothing is passed to neither useSnackbar() nor open()', () => {
    const wrapper = mountWithProvider(<ComponentMock />)
    const Transition = wrapper.find('Transition')

    // Position bottom-center
    expect(Transition.props().className).toEqual(
      `snackbar-wrapper snackbar-wrapper-${defaultPosition}`
    )

    // No snackbar rendered before open()
    expect(Transition.children().length).toBe(0)

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // setTimeout called with 5000ms delay
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), defaultDuration)

    // Open snackbar with '' text
    const SnackbarText = wrapper.find('.snackbar__text')
    expect(SnackbarText.text()).toEqual('')

    // No styles for snackbar and close button
    const Snackbar = wrapper.find('.snackbar')
    expect(Snackbar.props().style).toEqual({})
    const SnackbarClose = wrapper.find('.snackbar__close')
    expect(SnackbarClose.props().style).toEqual({})
  })

  it('should render snackbar with text', () => {
    // Mount with text
    const randomText = 'Some text to be rendered!'
    const wrapper = mountWithProvider(<ComponentMock text={randomText} />)

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // Open snackbar with "Some text to be rendered!"
    const SnackbarText = wrapper.find('.snackbar__text')
    expect(SnackbarText.text()).toEqual(randomText)
  })

  it('should set a custom duration on open()', () => {
    // Mount with duration
    const wrapper = mountWithProvider(<ComponentMock duration={8000} />)

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // setTimeout called with 8000ms delay
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 8000)
  })

  it('should set position className when passed correctly', () => {
    const snackbarProperties = {
      position: 'top-left',
    }

    // Mount with snackbarProperties
    const wrapper = mountWithProvider(
      <ComponentMock snackbarProperties={snackbarProperties} />
    )

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // Position top-left
    const Transition = wrapper.find('Transition')
    expect(Transition.props().className).toEqual(
      'snackbar-wrapper snackbar-wrapper-top-left'
    )
  })

  it('should render default position className when passed incorrectly', () => {
    const snackbarProperties = {
      position: 'some-position-that-doesnt-exist',
    }

    // Mount with snackbarProperties
    const wrapper = mountWithProvider(
      <ComponentMock snackbarProperties={snackbarProperties} />
    )

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // Position bottom-center
    const Transition = wrapper.find('Transition')
    expect(Transition.props().className).toEqual(
      `snackbar-wrapper snackbar-wrapper-${defaultPosition}`
    )
  })

  it('should pass a custom style for snackbar and close button as props', () => {
    const snackbarProperties = {
      style: {
        color: 'green',
        border: '2px solid yellow',
        textAlign: 'center',
      },
      closeStyle: {
        color: 'red',
        fontSize: '18px',
      },
    }

    // Mount with snackbarProperties
    const wrapper = mountWithProvider(
      <ComponentMock snackbarProperties={snackbarProperties} />
    )

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // Styles props for snackbar and close button
    const Snackbar = wrapper.find('.snackbar')
    expect(Snackbar.props().style).toEqual(snackbarProperties.style)
    const SnackbarClose = wrapper.find('.snackbar__close')
    expect(SnackbarClose.props().style).toEqual(snackbarProperties.closeStyle)
  })

  it('should close snackbar with close()', () => {
    const wrapper = mountWithProvider(<ComponentMock />)

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // Simulates close()
    Component.find('[data-test="close"]').simulate('click')

    // "in" prop has to be false
    const Transition = wrapper.find('Transition')
    expect(Transition.props().in).toBe(false)
  })

  it('should open and close snackbar after duration end', () => {
    const wrapper = mountWithProvider(<ComponentMock />)

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // "in" prop has to be true
    let Transition = wrapper.find('Transition')
    expect(Transition.props().in).toBe(true)

    // Advance time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(defaultDuration)
      wrapper.update()
    })

    // "in" prop has to be false
    Transition = wrapper.find('Transition')
    expect(Transition.props().in).toBe(false)
  })

  it('should remove the current snackbar and apply a new one when open() is called again before duration ends', () => {
    const wrapper = mountWithProvider(<ComponentMock />)

    // Simulates first open()
    const Component = wrapper.find(ComponentMock)
    const OpenButton = Component.find('[data-test="open"]')

    OpenButton.simulate('click')

    // "in" prop has to be true
    let Transition = wrapper.find('Transition')
    expect(Transition.props().in).toBe(true)

    // Simulates second open()
    OpenButton.simulate('click')

    // "in" prop has to be false
    Transition = wrapper.find('Transition')
    expect(Transition.props().in).toBe(false)

    // Advance time by 250ms
    act(() => {
      jest.advanceTimersByTime(defaultInterval)
      wrapper.update()
    })

    // "in" prop has to be true after delay
    Transition = wrapper.find('Transition')
    expect(Transition.props().in).toBe(true)

    // Advance time by 5 seconds
    act(() => {
      jest.advanceTimersByTime(defaultDuration)
      wrapper.update()
    })

    // "in" prop has to be false after duration ends
    Transition = wrapper.find('Transition')
    expect(Transition.props().in).toBe(false)
  })
})
