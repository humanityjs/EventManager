import isEmpty from 'lodash/isEmpty';
// import { GET_CENTERS, GET_CENTERS_BEGIN, GET_CENTERS_ERROR } from '../actions/types';

const initialState = {
  loading: false,
  loaded: false,
  centers: [],
  error: '',
  centerSelected: '',
  center: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    // case 'CLEAR_CENTER_STATE': {
    //   const id = action.payload;
    //   return {
    //     ...state,
    //     id,
    //   };
    // }
    case 'SET_CURRENT_CENTER': {
      const id = action.payload;
      return {
        ...state,
        isCenter: !isEmpty(id),
        id,
      };
    }

    case 'GET_CENTERS': {
      return {
        ...state,
        loading: true,
        status: '',
        error: '',
      };
    }
    case 'GET_CENTERS_FAILS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        error: message,
        status,
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
    case 'CENTER_SELECTED': {
      return {
        ...state,
      };
    }
    case 'GET_CENTER': {
      return {
        ...state,
        error: '',
      };
    }
    case 'GET_CENTER_FAILS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        error: message,
        status,
      };
    }
    case 'GET_CENTER_SUCCESS': {
      const { center } = action.payload.data;
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
        message: '',
      };
    }
    case 'MODIFY_CENTER_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'MODIFY_CENTER_SUCCESS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status,
      };
    }
    case 'DELETE_CENTER': {
      return {
        ...state,
        loading: true,
        status: '',
      };
    }
    case 'DELETE_CENTER_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'DELETE_CENTER_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'ADD_CENTER': {
      return {
        ...state,
        loading: true,
        status: '',
      };
    }
    case 'ADD_CENTER_FAILS': {
      const { status } = action.payload;
      return {
        ...state,
        status,
      };
    }
    case 'ADD_CENTER_SUCCESS': {
      const { status } = action.payload;
      const { center } = action.payload.data;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
        center,
      };
    }
    case 'ADD_IMAGE': {
      return {
        ...state,
        loading: true,
        status: '',
      };
    }
    case 'ADD_IMAGE_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'ADD_IMAGE_SUCCESS': {
      const url = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        url,
      };
    }
    
    default:
      return state;
  }
};
