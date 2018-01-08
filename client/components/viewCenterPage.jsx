import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './navbar.jsx';
import Content from './centerDetails/centerDetailsContent';
import Footer from './footer';

@connect((store) => {
  return {
    user: store.auth,
  };
})

export default class ViewCenterDetails extends React.Component {
  render() {
     //Check if user is logged in and is also an Admin
     if (!this.props.user.isAuth) {
      return (<Redirect to="/" />);
    } else if (!this.props.user.user.isAdmin) {
      return (<Redirect to="/dashboard" />);
    }
    
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