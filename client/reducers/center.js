
//import { GET_CENTERS, GET_CENTERS_BEGIN, GET_CENTERS_ERROR } from '../actions/types';

const initialState = {
  loading: false,
  loaded: false,
  centers: [],
  getCenterError: null,
  addCenterError: null,
  centerSelected: '',
  center: {},
};
export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_CENTERS': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_CENTERS_FAILS': {
      const { error } = action.payload;
      return {
        getCenterError: error,
      };
    }
    case 'GET_CENTERS_SUCCESS': {
      const { centers } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        centers,
      };
    }
    case 'ADD_CENTER': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'ADD_CENTER_FAILS': {
      return {
        ...state,
        addCenterError: action.payload, 
      }
    }
    case 'ADD_CENTER_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true, 
      }
    }
    case 'CENTER_SELECTED': {
      return {
        ...state,
        centerSelected: action.payload,
      }
    }
    case 'GET_CENTER': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_CENTER_FAILS': {
      const { error } = action.payload;
      return {
        getCenterError: error,
      };
    }
    case 'GET_CENTER_SUCCESS': {
      const { center } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        center,
      };
    }
    case 'MODIFY_CENTER': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'MODIFY_CENTER_FAILS': {
      const { error } = action.payload;
      return {
        getCENTERError: error,
      };
    }
    case 'MODIFY_CENTER_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    default:
      return state;
  }
};
