import axios from 'axios';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
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

export function confirmEmail(data) {
  return (dispatch) => {
    dispatch({ type: 'VERIFY_EMAIL' });
    axios.post('api/v1/passrecovery', data).then((response) => {
      dispatch({ type: 'VERIFY_EMAIL_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'VERIFY_EMAIL_FAIL', payload: err.response.data });
    });
  };
}

export function generateCode() {
  return (dispatch) => {
    const shortCode = shortid.generate();
    dispatch({ type: 'GENERATE_CODE', payload: shortCode });
  }
}

export function updateUserDetails(data) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_USER' });
    axios.put('api/v1/users', data).then((response) => {
      dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'UPDATE_USER_FAILS', payload: err.response.data })
    });
  }
}
