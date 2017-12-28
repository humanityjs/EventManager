import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GetCenters from './getCenters';
import GetEvents from './getEvents';
import { getCenters, centerSelected } from '../actions/centerActions';
import { getUserEvents } from '../actions/eventActions'

class UserPanelContent extends React.Component {

  User() {
    const { getCenters, getUserEvents, centerSelected } = this.props;
    if (this.props.auth.user.isAdmin) {
      return <GetCenters getCenters = {getCenters} centerSelected={centerSelected}/>
    }
    return <GetEvents getUserEvents={getUserEvents}/>
  }

  render() {
    return (
      this.User()
    );
  }
}

UserPanelContent.propTypes = {
  getCenters: PropTypes.func.isRequired,
  centerSelected: PropTypes.func.isRequired,
  getUserEvents: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

// function mapDispatchToProps(dispatch) {
//   return ({
//     centerSelected: () => {
//       dispatch(centerSelected());
//     }
//   });
// }

export default connect(mapStateToProps, {getCenters, getUserEvents, centerSelected})(UserPanelContent);