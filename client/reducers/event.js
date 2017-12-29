
//import { GET_EVENTS, GET_EVENTS_BEGIN, GET_EVENTS_ERROR } from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  events: [],
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_EVENTS': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'GET_EVENTS_FAILS': {
      const { error } = action.payload;
      return {
        error,
      };
    }
    case 'GET_EVENTS_SUCCESS': {
      const { events } = action.payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        events,
      };
    }
    default:
      return state;
  }
};
