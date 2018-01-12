import React from 'react';
import Navbar from './navbar.jsx';
import Content from './Homepage/homeContent';
import Footer from './footer';

export default class Homepage extends React.Component {
  render() {

    const { pathname } = this.props.location;
    return (
      <div className="page-wrapper">
        <Navbar path={pathname}/>
        <Content />
        <Footer />
      </div>
    );
  }
}