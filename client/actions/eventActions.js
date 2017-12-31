import axios from 'axios';
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

export function eventSelected(event) {
  return (dispatch) => {
    dispatch({ type: 'EVENT_SELECTED', payload: event });
  };
}

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

export function modifyEvent(id, data) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_EVENT' });
    axios.put(`api/v1/events/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_EVENT_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_EVENT_FAILS', payload: err.response.data.message });
    });
  };
}

