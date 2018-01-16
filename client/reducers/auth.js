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
      };

    case 'VERIFY_EMAIL': {
      return {
        ...state,
        loading: 'true',
        status: '',
      }
    }
    case 'VERIFY_EMAIL_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: 'false',
        loaded: 'true',
        status,
      }
    }
    case 'VERIFY_EMAIL_FAIL': {
      const { message } = action.payload;
      return {
        ...state,
        loading: 'false',
        loaded: 'true',
        message,
      }
    }
    case 'GENERATE_CODE': {
      return {
        ...state,
        status: '',
        code: action.payload,
      }
    }
    default: return state;
  }
};
