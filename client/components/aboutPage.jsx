import React from 'react';

import Navbar from './navbar.jsx';
import Content from './AboutPage/aboutPageContent.jsx';
import Footer from './footer.jsx';
import aboutStyle from '../../template/Public/css/about.css';

export default class AboutPage extends React.Component {
  render() {
    const {pathname} = this.props.location;
    return (
      <div>
        <div className="page-wrapper">
          <aboutStyle />
          <Navbar path={pathname}/>
          <Content />
          <Footer />
        </div>
      </div>
    );
  }
}