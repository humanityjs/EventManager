import React from 'react';
import { connect } from 'react-redux';
import GetCenters from './getCenters';
import GetEvents from './getEvents';
class UserPanelContent extends React.Component {

  User() {
    if (this.props.auth.user.isAdmin) {
      return <GetCenters />
    }
    return <GetEvents />
  }

  render() {
    return (
      this.User()
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(UserPanelContent);