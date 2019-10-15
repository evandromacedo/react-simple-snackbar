import React from 'react'
import toJSON from 'enzyme-to-json'
import SnackbarProvider, { useSnackbar } from './Snackbar'
import { shallow, mount } from 'enzyme'

// const Component = () => {
//   const [open] = useSnackbar()

//   return <button onClick={() => open('teste')}>Button</button>
// }

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
  it('should render properly', () => {
    shallow(<SnackbarProvider />)
  })

  it('should render with default values when nothing is passed to useSnackbar()', () => {
    const wrapper = mountWithProvider(<ComponentMock />)
    const Transition = wrapper.find('Transition')

    // Position bottom-center
    expect(Transition.props().className).toEqual(
      'snackbar-wrapper snackbar-wrapper-bottom-center'
    )

    // No snackbar rendered before open()
    expect(Transition.children().length).toBe(0)

    // Simulates open()
    const Component = wrapper.find(ComponentMock)
    Component.find('[data-test="open"]').simulate('click')

    // No styles for snackbar and close button
    const Snackbar = wrapper.find('.snackbar')
    expect(Snackbar.props().style).toEqual({})
    const SnackbarClose = wrapper.find('.snackbar__close')
    expect(SnackbarClose.props().style).toEqual({})

    // Open snackbar with '' text
    const SnackbarText = wrapper.find('.snackbar__text')
    expect(SnackbarText.text()).toEqual('')
  })

  it('should open snackbar with default timeout', () => {
    const wrapper = mountWithProvider(<ComponentMock />)
    //   jest
    // .spyOn(Context, 'useDispatch')
    // .mockImplementation(() => ({ removeChampion: removeChampionMock }));
    // console.log(toJSON(Snackbar))
    // console.log(wrapper.debug())
  })

  it('im just testing stuff', () => {
    const wrapper = mountWithProvider(<ComponentMock />)

    const ComponentMockTest = wrapper.find(ComponentMock)
    // console.log(toJSON(ComponentTest))
    ComponentMockTest.find('[data-test="open"]').simulate('click')
    // wrapper.update()

    // console.log(wrapper.debug())
  })
})
