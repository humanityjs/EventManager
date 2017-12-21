import React from 'react';

import Navbar from './navbar.jsx';
import Content from './AboutPage/aboutPageContent.jsx';
import Footer from './footer.jsx';
// import aboutstyle from '../../template/Public/css/about.css';

export default class AboutPage extends React.Component {
  render() {
    const {pathname} = this.props.location;
    return (
      <div>
        <div className="page-wrapper">
          <Navbar path={pathname}/>
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}