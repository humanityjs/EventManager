import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class CenterDetailsContent extends React.Component {
  
  

  render() {
    console.log(this.props);
    return (
      <div class="col-lg-5">
        <div class="form-outer text-center">
          <div class="form-inner">
            <div class="logo"><strong class="text-primary"></strong></div>
            <p></p>
            <h3>facilities</h3>
            <p></p>
            <h3>description</h3>
            <p></p>
          </div>
        </div>
      </div>
    );
  }
}



export default CenterDetailsContent;