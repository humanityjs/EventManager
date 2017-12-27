import React from 'react';
import Content from './eventPage/addEvent';
import Footer from './footer';

class EventPage extends React.Component {
  render() {
    return (
        <div className="page-wrapper">

          <Content />
          <Footer />
        </div>
    );
  }
}

export default EventPage;