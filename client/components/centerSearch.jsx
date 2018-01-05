import React from 'react';
import { connect } from 'react-redux';
import { getCenters } from '../actions/centerActions';
import TextField from '../common/textField';

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
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  search() {
    this.props.dispatch(getCenters(this.state));
  }

  render() {
    const { location, facilities } = this.state;
    return (
      <div className="row">
        <div className="col-lg-6">
          <TextField
            id='location'
            value={this.state.location}
            placeholder='location'
            type='text'
            onChange={this.onChange}
          />
        </div>
        <div className="col-lg-6">
          <TextField
          id='facilities'
          value={this.state.facilities}
          placeholder='facilities'
          type='text'
          onChange={this.onChange} 
          />
        </div>
        <i className="fa fa-search green" onClick={this.search}> Search</i>
      </div>
    )
  }

}