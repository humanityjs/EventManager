import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEvent } from '../../actions/eventActions';
import TextField from '../../common/textField'

class AddEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      date: '',
      description: '',
      errors: {},
      isLoading: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createEvent(this.state);
  }

  render() {
    const { title, date, description, errors, isLoading } = this.state;
    return (
      <div className="container">
      <div className="row">
        <div className="form-outer text-center">
          <div className="form-inner">
            <div className="logo">lets make your <strong className="text-primary">event</strong> a memorable one</div>
            <hr/>
            <form id="add-event-form" onSubmit={this.onSubmit}>
              <p className="subtitle">select your preferred event center location</p>
 		          <div className="form-group">            
                <select id="location" className="form-control">
                  <option value="0">select your preferred event center location</option>
                  <option value="1">location 1</option>
                  <option value="2">location 2</option>
                </select>
		          </div>
              <TextField
              id='date'
              value={this.state.date}
              placeholder='choose date'
              type='date'
              error={errors.date}
              onChange={this.onChange} />
              <TextField
              id='title'
              value={this.state.title}
              placeholder='give your event a title'
              type='text'
              error={errors.title}
              onChange={this.onChange} />
           	  <p className="subtitle">describe your event in few words</p>
              <div className="form-group">
           	    <textarea className="form-control" id="description" error={errors.title}
              onChange={this.onChange}></textarea>
              </div> 
              <input id="add-event" type="submit" value="Add Event" className="btn btn-primary"/>
            </form>
          </div>
        </div>
      </div>
  	</div>
    )
  }
}

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
}

export default connect(null, { createEvent })(AddEvent);
