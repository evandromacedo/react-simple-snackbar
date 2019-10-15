import React from 'react'
import toJSON from 'enzyme-to-json'
import SnackbarProvider, {
  useSnackbar,
  defaultDuration,
  defaultPosition,
} from './Snackbar'
import { shallow, mount } from 'enzyme'

const ComponentMock = ({
  text = '',
  timeout = undefined,
  snackbarProperties = {},
} = {}) => {
  const [open, close] = useSnackbar(snackbarProperties)

  return (
    <div>
      <button data-test="open" onClick={() => open(text, timeout)}>
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

describe('<Snackbar />', () => {
  // Reset fake timers on each test
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should render properly', () => {
    shallow(<SnackbarProvider />)
  })

  it('should render with default values when nothing is passed neither to useSnackbar() nor open()', () => {
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

    // setTimout called with 5000ms delay
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
})
