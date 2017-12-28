
import { GET_CENTERS, GET_CENTERS_BEGIN, GET_CENTERS_ERROR } from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  centers: {},
  errors: null,
};
export default (state = initialState, action) => {
  switch (action.type) {

    case GET_CENTERS_BEGIN:
      return {
        ...state,
        fetching: true,
      };
    case GET_CENTERS:
      return {
        fetched: true,
        centers: action.centers,
      };
    case GET_CENTERS_ERROR:
      return {
        errors: action.error,
      };
    default: return state;
  }
};
