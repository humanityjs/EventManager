import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from './navbar.jsx';
import Content from './getCenters.jsx';
import Footer from './footer.jsx';
import { getCenters } from '../actions/centerActions';

class CenterPage extends React.Component {
  render() {
    const { getCenters } = this.props;
    return (
      <div className="page-wrapper">
        <div id="center-page">
          <Navbar />
          <Content getCenters = {getCenters}/>
          <Footer />
        </div>
      </div>
    );
  }
}

CenterPage.propTypes = {
  getCenters: PropTypes.func.isRequired
 }

export default connect(null, {getCenters})(CenterPage);