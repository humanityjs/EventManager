
//import { GET_CENTERS, GET_CENTERS_BEGIN, GET_CENTERS_ERROR } from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  centers: [],
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_CENTERS': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'GET_CENTERS_FAILS': {
      const { error } = action.payload;
      return {
        error,
      };
    }
    case 'GET_CENTERS_SUCCESS': {
      const { centers } = action.payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        centers,
      };
    }
    default:
      return state;
  }
};
