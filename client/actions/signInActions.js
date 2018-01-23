import axios from 'axios';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import setAuthToken from '../utils/setAuthorizationToken';


export function setCurrentUser(user, token) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: { user, token } })
  };
}
export function sendMail(title, message, email) {
  return (dispatch) => {
    const data = {
      title,
      message,
      email,
    }
    dispatch({ type: 'SEND_MAIL' });
    axios.post('api/v1/sendmail', data).then((response) => {
      dispatch({ type: 'SEND_MAIL_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'SEND_MAIL_FAIL', payload: err.response });
    });
  };
}

export function userSignupRequest(user) {
  return (dispatch) => {
    dispatch({ type: 'USER_SIGNUP' });
    axios.post('/api/v1/users', user).then((response) => {
      dispatch({ type: 'USER_SIGNUP_SUCCESS', payload: response });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token), token));
    }).catch((err) => {
      dispatch({ type: 'USER_SIGNUP_FAIL', payload: err.response });
    });
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function userSignInRequest(user) {
  return (dispatch) => {
    dispatch({ type: 'USER_LOGIN' });
    axios.post('api/v1/users/login', user).then((response) => {
      dispatch({ type: 'USER_LOGIN_SUCCESS' });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token), token));
    }).catch((err) => {
      dispatch({ type: 'USER_LOGIN_FAIL', payload: err.response });
    });
  };
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

export function getUserEmail(id) {
  return (dispatch) => {
    axios.get(`api/v1/userEmail/${id}`).then((response) => {
      dispatch({ type: 'GET_USER_EMAIL', payload: response });
    });
  }
}
