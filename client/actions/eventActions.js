import axios from 'axios';

export function getUserEvents() {
  return dispatch => axios.get('api/v1/userEvents');
}

export function createEvent(data) {
  return dispatch => axios.post('api/v1/events', data);
}