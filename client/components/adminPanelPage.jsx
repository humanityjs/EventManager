import React from 'react';

import Navbar from './navbar.jsx';
// import Content from './getAllCenters.jsx';
// import DeleteModal from './deleteModal.jsx';
import Footer from './footer.jsx';

export default class AdminPanelPage extends React.Component {
  render() {

    return (
      <div>
        <div className="page-wrapper">
          <Navbar />
          {/* <Content path={pathname}/>
          <DeleteModal /> */}
          <Footer />
        </div>
      </div>
    );
  }
}