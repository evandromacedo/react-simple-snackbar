import React from 'react'
import Component from './Snackbar'
import { shallow } from 'enzyme'

describe('<Snackbar />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Component />)
    console.log(wrapper.debug())
  })
})
