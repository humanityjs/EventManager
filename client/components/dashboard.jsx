import React from 'react';

import Navbar from './navbar.jsx';
import FlashMessageList from './flash/flashMessagesList';
import Content from './userPanelContent';
// import DeleteModal from './deleteModal.jsx';
import Footer from './footer.jsx';

export default class AdminPanelPage extends React.Component {
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