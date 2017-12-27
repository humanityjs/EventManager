import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function userSignupRequest(user) {
  return dispatch => axios.post('/api/v1/users', user).then((response) => {
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  })
}
