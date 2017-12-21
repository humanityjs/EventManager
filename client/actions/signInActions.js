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

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function userSignInRequest(user) {
  return dispatch => axios.post('api/v1/users/login', user).then((response) => {
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwt.decode(token)));
  });
}
