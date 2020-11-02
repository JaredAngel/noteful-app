import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ValidationError from './ValidationError';

describe(`ValidationError component`, () => {
  it('renders ValidationError by default', () => {
    const wrapper = shallow(<ValidationError />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})