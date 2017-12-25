import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GetCenters from './getCenters';
import GetEvents from './getEvents';
// import { getCenters } from '../actions/adminActions'


class UserPanelContent extends React.Component {

  // User() {
  //   const { getCenters } = this.props;
  //   if (this.props.auth.user.isAdmin) {
  //     return <GetCenters getCenters={getCenters}/>
  //   }
  //   return <GetEvents />
  // }

  render() {
    // const { getCenters } = this.props;
    return (
      <GetCenters />
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

// UserPanelContent.propTypes = {
//   getCenters: PropTypes.func.isRequired,
// }

export default connect(mapStateToProps, null)(UserPanelContent);