import React from 'react';
import { shallow, mount } from 'enzyme';
import HomePage from '../components/homePage.jsx';

describe('HomePage Component', () => {
  it('renders', () => {
    const props = {
      auth: {
        isAuth: false
      },
      location: {
        pathname: 'anything'
      }
    }
    const wrapper = shallow(<HomePage {...props} />)
    expect(wrapper.find('#homepage').exists()).toBeTruthy();
    expect(wrapper.find('#homepage').length).toBe(1);
  });
});
