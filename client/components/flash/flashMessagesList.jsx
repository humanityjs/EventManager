import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FlashMessage from './flashMessage';
import { deleteFlashMessage } from '../../actions/flashMessages'

class FlashMessagesList extends React.Component {
  render() {
    const { message } = this.props.messages.map(message =>
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage}/>
    );
    return (
      <div className='text-center'>{message}</div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.flashMessages
  };
}

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessagesList);