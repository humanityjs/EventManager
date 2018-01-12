import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Content from './eventPage';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

@connect((store) => {
  return {
    auth: store.auth,
  }
})

export default class ModifyEventPage extends React.Component {

  render() {
    
     //Check if user is logged in
     if (!this.props.auth.isAuth) {
      return (<Redirect to="/" />);
    }
    const { pathname } = this.props.location;
    return (
      <div>
        <Navbar />
        <Content path={pathname}/>
        <Footer />
      </div>
    )
  }
}

