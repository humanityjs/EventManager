import axios from 'axios';

export function userSignupRequest(user) {
  return dispatch => axios.post('/api/v1/users');
}
