import React from 'react';

import Navbar from './navbar.jsx';
import CenterContent from './getCenters.jsx';
import CenterFooter from './footer.jsx';


export default class CentersPage extends React.Component {
  render() {

    return (
      <div>
        <div className="page-wrapper">
          <CenterContent />
          <CenterFooter />
        </div>
      </div>
    );
  }
}