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

