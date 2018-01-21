import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuth: false,
  user: {},
  loading: '',
  loaded: '',
  status: '',
  message: '',
  error: '',
};
export default (state = initialState, action = {}) => {
  switch (action.type) {

    case 'SET_CURRENT_USER': {
      const { token, user } = action.payload;
      return {
        isAuth: !isEmpty(user),
        user,
        userToken: token,
      };
    }
    case 'USER_LOGIN': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
      };
    }
    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case 'USER_LOGIN_FAIL': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'USER_SIGNUP': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
      };
    }
    case 'USER_SIGNUP_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case 'USER_SIGNUP_FAIL': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'VERIFY_EMAIL': {
      return {
        ...state,
        loading: true,
        status: '',
        message: '',
      };
    }
    case 'VERIFY_EMAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'VERIFY_EMAIL_FAIL': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'GENERATE_CODE': {
      return {
        ...state,
        status: '',
        codeMessage: '',
        code: action.payload,
      };
    }
    case 'WRONG_CODE': {
      return {
        ...state,
        status: '',
        codeMessage: action.payload,
        codeStatus: '',
      };
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        status: '',
        message: '',
        code: '',
        loading: true,
        loaded: false,
      };
    }
    case 'UPDATE_USER_SUCCESS': {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'UPDATE_USER_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      };
    }
    case 'SEND_MAIL': {
      return {
        ...state,
        loading: true,
        loaded: false,
        status: '',
        message: '',
      };
    }
    case 'SEND_MAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'SEND_MAIL_FAIL': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'GET_USER_EMAIL': {
      const { email } = action.payload.data;
      return {
        ...state,
        loaded: true,
        loading: false,
        email,
      };
    }
    default: return state;
  }
};
