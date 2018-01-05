import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { modifyEvent } from '../../actions/eventActions';
import { modifyEventValidation } from '../../shared/eventValidations';
import TextField from '../../common/textField';

@connect((store) => {
  return {
    user: store.auth.user,
    events: store.event.events,
  }
})

export default class EventForm extends React.Component {
  constructor() {

    super();
    this.state = {
      description:'',
      title:'',
      bookedDate: '',
      errors: {},
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
        this.props.dispatch(modifyEvent(this.state, this.props.center.centerSelected));
    }
    
  }

  isValid() {
    const { errors, isValid } = modifyEventValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const {
      title,
      bookedDate,
      description,
      errors,
      serverError,
    } = this.state;

    return ( 
      
      <form id="add-center-form" onSubmit={this.onSubmit}>
        <span className="help-block">{this.props.event}</span>
        <TextField
          id='centerName'
          value={this.state.eventTitle}
          placeholder='center name'
          type='text'
          error={errors.eventTitle} 
          onChange={this.onChange} />

        <TextField
          id='location'
          value={this.state.bookedDate}
          placeholder='location'
          type='text'
          error={errors.bookedDate} 
          onChange={this.onChange} />

        <p class="subtitle">describe the event in few words</p>
          <span className="help-block">{errors.description}</span>
          <div class="form-group">
            <textarea class="form-control" id="description" onChange={this.onChange} defaultValue={this.state.description}></textarea>
          </div> 
          <input id="modify-event" type="submit" value="Save" class="btn btn-primary"/>
      </form>
    );
  }
}


