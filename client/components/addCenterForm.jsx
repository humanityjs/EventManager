import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { addCenter, modifyCenter } from '../actions/centerActions';
import { addCenterValidation, modifyCenterValidation } from '../shared/centerValidations';
import TextField from '../common/textField2';
import { logout } from '../actions/signInActions';
import UploadImage from './imageUpload';

@connect((store) => {
  return {
    user: store.auth.user,
    center: store.center,
  }
})

export default class CenterForm extends React.Component {
  constructor(props) {

    super(props);
    const { centerName, location, description, facilities, capacity, image_url } = props.center.centerInfo;
    this.state = {
      centerName: centerName || '',
      location: location || '',
      description: description || '',
      facilities: facilities || '',
      capacity: capacity || '',
      errors: {},
      image_url: image_url || '',
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
    this.logout = this.logout.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.state.image_url = this.props.center.url;
      this.props.dispatch(addCenter(this.state));
    } 
  }

  isValid() {
    if (this.props.path === '/add-center') {
      const { errors, isValid } = addCenterValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    } else {
      if (!isEmpty(this.state.description) || !isEmpty(this.state.centerName) || !isEmpty(this.state.location)
        || !isEmpty(this.state.facilities) || !isEmpty(this.state.capacity)) {
          const { errors, isValid } = modifyCenterValidation(this.state);
          if (!isValid) {
            this.setState({ errors });
          }
          return isValid;
      }
    }
  }

  logout(e) {
    this.props.logout();
  }

  render() {
    if (this.props.path === '/view-center-event') {
      
    }
    // const { centerName } = this.props.venue;
    
    const {
      centerName,
      location,
      facilities,
      description,
      capacity,
      errors,
      serverError,
    } = this.state;
    let buttonValue, nameHolder, facHolder, descHolder, locationHolder, capacityHolder;
    if (this.props.path === '/add-center') {
      buttonValue = 'Add Center';
    } else {
      buttonValue = 'Save';
    }

    nameHolder = 'Center name';
    facHolder = "Facilities in center";
    descHolder = "Describe center in few words";
    locationHolder = "Center location";
    capacityHolder = "Capacity";
    return ( 
      
      <form id="add-center-form" onSubmit={this.onSubmit}>
        <UploadImage uploadedImage={this.props.center.url}/>
        <span className="help-block">{this.props.center.addCenterError}</span>
        <TextField
          id='centerName'
          value={centerName}
          placeholder={nameHolder}
          type='text'
          error={errors.centerName} 
          onChange={this.onChange} />

        <TextField
          id='location'
          value={this.state.location}
          placeholder={locationHolder}
          type='text'
          error={errors.location} 
          onChange={this.onChange} />
        <p class="subtitle">separate facilities with commas. Do not include spaces</p>
        <TextField
          id='facilities'
          value={this.state.facilities}
          placeholder={facHolder}
          type='text'
          error={errors.facilities} 
          onChange={this.onChange} />

        <TextField
          id='capacity'
          value={this.state.capacity}
          placeholder={capacityHolder}
          type='text'
          error={errors.capacity} 
          onChange={this.onChange} />

          <span className="help-block">{errors.description}</span>
          <p class="subtitle">describe the center in few words</p>
          <div class="form-group">
            <textarea class="form-control" id="description" onChange={this.onChange} placeholder={descHolder} value={this.state.description}></textarea>
          </div> 
          <input id="add-event" type="submit" value={buttonValue} class="btn btn-primary basic"/>
      </form>
    );
  }
}


