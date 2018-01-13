import React from 'react';
import { connect } from 'react-redux';
import Centers from './getCenters';
import Search from './centerSearch';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

@connect((store) => {
  return {
    center: store.center,
  }
})

export default class CenterPage extends React.Component {
  
  render() {
    return (
      <div id="center-page">
        <Navbar />
        <div className="container">
            <Search />
            <Centers />
          </div>
        <Footer />
      </div>
    );
  }
}
