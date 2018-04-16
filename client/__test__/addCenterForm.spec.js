import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import AddCenterForm from '../components/addCenterForm.jsx';

describe('AddCenterForm component', () => {
  it('calls onChange method on input field change', () => {
    const props = {
      center: {
        url: '/',
        error: ''
      }
    }
    const spy = sinon.spy(AddCenterForm.prototype, 'onChange');
    const wrapper = shallow(<AddCenterForm {...props} />)
    wrapper.find('#centerName').simulate('change', { target: { id: 'centerName', value: 'ET' } })
    expect(spy.called).toBeTruthy();
    spy.restore()
  });

  it('calls onSubmit method when user submit the form', () => {
    const props = {
      center: {
        url: '/',
        error: ''
      }
    }
    const spy = sinon.spy(AddCenterForm.prototype, 'onSubmit');
    const wrapper = shallow(<AddCenterForm {...props} />)
    wrapper.setState({
      centerName: 'Epic Towers',
      location: 'Epic towers, 235 Ikorodu road, Ilupeju',
      description: 'This is just a normal event',
      facilities: ['big space', 'internet', 'car park', 'big boards', 'projector'],
      capacity: 500,
      errors: {},
      imageUrl: '',
    })
    wrapper.find('#add-center-form').simulate('submit', { preventDefault: () => null })
    console.log(wrapper.instance().state)
    expect(spy.called).toBeTruthy();
    spy.restore()
  });

});
