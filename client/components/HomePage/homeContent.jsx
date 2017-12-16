import React from 'react';

import Welcome from './HomeContent/welcome.jsx';
import Form from './HomeContent/form.jsx'

export default class MainContent extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Welcome />
          <Form />
        </div>
      </div>
    );
  }
}