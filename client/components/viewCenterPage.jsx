import React from 'react';

import Navbar from './navbar.jsx';
import Content from './centerDetails/centerDetailsContent';
import Footer from './footer';

export default class ViewCenterDetails extends React.Component {
  render() {
    const { pathname } = this.props.location
    return (
      <div className="page-wrapper">
        <Navbar />
        <Content path={pathname}/>
        <Footer />
      </div>
    );
  }
}