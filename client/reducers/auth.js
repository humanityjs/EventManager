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
    
    case SET_CURRENT_USER:
      return {
        isAuth: !isEmpty(action.user),
        user: action.user,
        userToken: action.userToken,
      };

    case 'VERIFY_EMAIL': {
      return {
        ...state,
        loading: true,
        status: '',
        message:'',
      }
    }
    case 'VERIFY_EMAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      }
    }
    case 'VERIFY_EMAIL_FAIL': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      }
    }
    case 'GENERATE_CODE': {
      return {
        ...state,
        status: '',
        codeMessage: '',
        codeStatus: 'Code sent. It expires in 5 minutes',
        code: action.payload,
      }
    }
    case 'WRONG_CODE': {
      return {
        ...state,
        status: '',
        codeMessage: action.payload,
        codeStatus:'',
      }
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        status: '',
        message: '',
        code: '',
        loading: true,
        loaded: false,
      }
    }
    case 'UPDATE_USER_SUCCESS': {
      const { message } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      }
    }
    case 'UPDATE_USER_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
      }
    }
    default: return state;
  }
};
