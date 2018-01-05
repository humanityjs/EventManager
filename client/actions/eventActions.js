import axios from 'axios';
import { getCenterSelected } from './centerActions';
// import { GET_EVENTS_BEGIN, GET_EVENTS_ERROR, GET_EVENTS } from './types';

export function getEvents() {
  return (dispatch) => {
    dispatch({ type: 'GET_EVENTS' });
    axios.get('api/v1/userEvents').then((response) => {
      dispatch({ type: 'GET_EVENTS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_EVENTS_FAILS', error: err });
    });
  };
}

export function getCenterEvents(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTER_EVENTS' });
    axios.get(`api/v1/centerEvents/${id}`).then((response) => {
      dispatch({ type: 'GET_CENTER_EVENTS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTER_EVENTS_FAILS', error: err.response.data.message });
    });
  };
}

// export function eventSelected(event) {
//   return (dispatch) => {
//     dispatch({ type: 'EVENT_SELECTED', payload: event });
//   };
// }

export function getEventSelected(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_EVENT' });
    axios.get(`api/v1/events/${id}`).then((response) => {
      dispatch({ type: 'GET_EVENT_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_EVENT_FAILS', payload: err.response.data.message });
    });
  };
}

export function modifyCenterEvent(id, data, centerId) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_CENTER_EVENT' });
    axios.put(`api/v1/events/${id}`, data).then(() => {
      dispatch({ type: 'MODIFY_CENTER_EVENT_SUCCESS' });
      axios.get(`api/v1/centerEvents/${centerId}`).then((response) => {
        dispatch({ type: 'GET_CENTER_EVENTS_SUCCESS', payload: response.data });
      }).catch((err) => {
        dispatch({ type: 'GET_CENTER_EVENTS_FAILS', error: err.response.data.message });
      });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_CENTER_EVENT_FAILS', payload: err.response.data.message });
    });
  };
}

export function deleteCenterEvent(id, centerId) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_CENTER_EVENT' });
    axios.delete(`api/v1/events/${id}`).then(() => {
      dispatch({ type: 'DELETE_CENTER_EVENT_SUCCESS'});
      axios.get(`api/v1/centerEvents/${centerId}`).then((response) => {
        dispatch({ type: 'GET_CENTER_EVENTS_SUCCESS', payload: response.data });
      }).catch((err) => {
        dispatch({ type: 'GET_CENTER_EVENTS_FAILS', error: err.response.data.message });
      });
    }).catch((err) => {
      dispatch({ type: 'DELETE_CENTER_EVENT_FAILS', payload: err.response.data.message });
    });
  };
}

export function deleteEvent(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_EVENT' });
    axios.delete(`api/v1/events/${id}`).then(() => {
      dispatch({ type: 'DELETE_EVENT_SUCCESS'});
      axios.get('api/v1/userEvents').then((response) => {
        dispatch({ type: 'GET_EVENTS_SUCCESS', payload: response.data });
      }).catch((err) => {
        dispatch({ type: 'GET_EVENTS_FAILS', error: err });
      });
    }).catch((err) => {
      dispatch({ type: 'DELETE_EVENT_FAILS', payload: err.response.data.message });
    });
  };
}

