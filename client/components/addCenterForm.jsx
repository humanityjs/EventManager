import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { addCenter, modifyCenter } from '../actions/centerActions';
import { addCenterValidation, modifyCenterValidation } from '../shared/centerValidations';
import TextField from '../common/textField';

@connect((store) => {
  return {
    user: store.auth.user,
    center: store.center,
  }
})

export default class CenterForm extends React.Component {
  constructor() {

    super();
    this.state = {
      centerName: '',
      location:'',
      description:'',
      facilities:'',
      errors: {},
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  // componentWillMount() {
  //   const { center } = this.props.center;
  //   if (this.props.path === '/view-center-event') {
  //     this.setState({
  //       centerName:center.centerName,
  //       location:center.location,
  //       facilities:'',
  //       description:'',
  //       errors: {},
  //     });
  //   }
  //   console.log(center)
  // }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      if (this.props.path === '/add-center') {
        this.props.dispatch(addCenter(this.state));
      } else if(this.props.path === '/view-center-event') {
        this.props.dispatch(modifyCenter(this.state, this.props.center.centerSelected));
      }
      
  
      // this.context.router.history.push('/admin-center')
      // if (this.props.center.addCenterError === 'Token is Invalid or Expired') {
      //   console.log(this.props);
      // }
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
      const { errors, isValid } = modifyCenterValidation(this.state);
      if (!isValid) {
        this.setState({ errors });
      }
      return isValid;
    }
  }

  render() {
    const {
      centerName,
      location,
      facilities,
      description,
      errors,
      serverError,
    } = this.state;
    let buttonValue;
    if (this.props.path === '/add-center') {
      buttonValue = 'Add Center';
    } else {
      buttonValue = 'Save';
    }
    return ( 
      
      <form id="add-center-form" onSubmit={this.onSubmit}>
        <span className="help-block">{this.props.center.addCenterError}</span>
        <div className="media">
          <img className="img" src="images/image2.jpg"/>
        </div>
        <TextField
          id='centerName'
          value={this.state.centerName}
          placeholder='center name'
          type='text'
          error={errors.centerName} 
          onChange={this.onChange} />

        <TextField
          id='location'
          value={this.state.location}
          placeholder='location'
          type='text'
          error={errors.location} 
          onChange={this.onChange} />
        <p class="subtitle">separate facilities with commas. Do not include spaces</p>
        <TextField
          id='facilities'
          value={this.state.facilities}
          placeholder='facilities in center'
          type='text'
          error={errors.facilities} 
          onChange={this.onChange} />

          <p class="subtitle">describe the center in few words</p>
          <span className="help-block">{errors.description}</span>
          <div class="form-group">
            <textarea class="form-control" id="description" onChange={this.onChange} value={this.state.description}></textarea>
          </div> 
          <input id="add-event" type="submit" value={buttonValue} class="btn btn-primary"/>
      </form>
    );
  }
}


