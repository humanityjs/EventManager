import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from './navbar.jsx';
import CenterContent from './getCenters.jsx';
import CenterFooter from './footer.jsx';
import { getCenters } from '../actions/centerActions';

class CentersPage extends React.Component {
  render() {
    const { getCenters } = this.props;
    return (
      <div>
        <div className="page-wrapper">
          <Navbar />
          <CenterContent getCenters = {getCenters}/>
          <CenterFooter />
        </div>
      </div>
    );
  }
}

CenterContent.propTypes = {
  getCenters: PropTypes.func.isRequired
 }

export default connect(null, {getCenters})(CenterContent);