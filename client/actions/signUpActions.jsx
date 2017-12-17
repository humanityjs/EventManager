import axios from 'axios';

export function userSignUpRequest(userData) {
  return dispatch => axios.post('/api/v1/users', userData);
}
