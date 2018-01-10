import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

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
      eventTitle:'',
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
    this.state = {
      eventTitle: this.state.eventTitle,
      description: this.state.description,
      bookedDate: this.props.date,
      centerId: this.props.center,
      isApproved: this.props.isApproved,
    };
    console.log(this.state)
    if (!isEmpty(this.state.description) || !isEmpty(this.state.eventTitle)) {
        if (this.isValid()) {
          this.props.dispatch(modifyEvent(this.props.id, this.state));
        }
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
      eventTitle,
      description,
      errors,
      serverError,
    } = this.state;

    return ( 
      
      <form id="edit-center-form" onSubmit={this.onSubmit}>
        <span className="help-block">{this.props.event}</span>
        <div class="form-group">  
          <span className="help-block">{errors.eventTitle}</span>  
          <input type="text" id="eventTitle" onChange={this.onChange} class="form-control" value={this.state.eventTitle} placeholder={this.props.title}/>
        </div>
        <p class="subtitle">describe the event in few words</p>
        <span className="help-block">{errors.description}</span>
        <div class="form-group">
          <textarea class="form-control" id="description" onChange={this.onChange} placeholder={this.props.description}></textarea>
        </div> 
        <input id="modify-event" type="submit" value="Save" class="btn btn-primary"/>
      </form>
    );
  }
}


