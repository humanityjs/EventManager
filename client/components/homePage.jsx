import React from 'react';

import Navbar from './navbar.jsx';
import Content from './Homepage/homeContent';
import Footer from './footer';

export default class Homepage extends React.Component {
  render() {

    return (
      <div>
        <div className="page-wrapper">
          <Navbar />
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}