import React from 'react';

import Navbar from './navbar.jsx';
import Content from './Homepage/homeContent';
import Footer from './footer';

export default class ViewCenterDetails extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <Navbar />
        <Content />
        <Footer />
      </div>
    );
  }
}