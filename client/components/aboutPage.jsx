import React from 'react';

import Navbar from './navbar.jsx';
import Content from './AboutPage/aboutPageContent.jsx';
import Footer from './footer.jsx';


export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="page-wrapper">
        <div id="about-page">
          <Navbar />
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}