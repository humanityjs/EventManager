import React from 'react';
import { connect } from 'react-redux';
import { getCenters } from '../actions/centerActions';
// import { searchValidation } from '../shared/centerValidations';

@connect((store) => {
  return {
    centers: store.center.centers,
  }
})

export default class SearchForm extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      facilities: '',
      capacity: '',
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
    
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }
  // isValid() {
  //   console.log('start')
  //   const { errors, isValid} = searchValidation(this.state);
  //   if (!isValid) {
  //     this.setState({ errors });
  //   }
  //   return isValid;
  // }

  search() {
    this.props.dispatch(getCenters(this.state));
  }

  render() {
    const { location, facilities, capacity } = this.state;
    return (
      <div className="row search">
        <p class="subtitle"><i className="fa fa-filter green"></i> filter centers by</p>
        <div className="col-lg-3">
          <div className="form-group">
            <input
              id='location'
              value={this.state.location}
              placeholder='location'
              type='text'
              onChange={this.onChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group">
            <input
            id='facilities'
            value={this.state.facilities}
            placeholder='facilities'
            type='text'
            onChange={this.onChange}
            className="form-control" 
            />
          </div>
        </div>
        <i className="fa fa-chevron-left"></i>
        <div className="col-lg-3">
          <div className="form-group">
            <input
            id='capacity'
            value={this.state.capacity}
            placeholder='capacity'
            type='number'
            onChange={this.onChange}
            className="form-control" 
            />
          </div>
        </div>
        <i className="fa fa-chevron-right"></i>
        <div className="col-lg-2">
          <button className="btn btn-success"><i className="fa fa-search" onClick={this.search}> Search</i></button>
        </div>
      </div>
    )
  }

}