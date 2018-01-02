
//import { GET_EVENTS, GET_EVENTS_BEGIN, GET_EVENTS_ERROR } from '../actions/types';

const initialState = {
  loading: false,
  loaded: false,
  events: [],
  error: null,
  event: {
    eventTitle: '',
  },
  eventSelected: '',
};
export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_EVENTS': {
      return {
        ...state,
        loading: true,
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
        loading: false,
        loaded: true,
        events,
      };
    }
    case 'GET_CENTER_EVENTS': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_CENTER_EVENTS_FAILS': {
      const { error } = action.payload;
      return {
        error,
      };
    }
    case 'GET_CENTER_EVENTS_SUCCESS': {
      const { events, message } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        events,
        message,
      };
    }
    case 'EVENT_SELECTED': {
      return {
        ...state,
        eventSelected: action.payload,
      }
    }
    case 'GET_EVENT': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_EVENT_FAILS': {
      const { error } = action.payload;
      return {
        getEventError: error,
      };
    }
    case 'GET_EVENT_SUCCESS': {
      const { event } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        event,
      };
    }
    case 'MODIFY_EVENT': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'MODIFY_EVENT_FAILS': {
      const { error } = action.payload;
      return {
        getEventError: error,
      };
    }
    case 'MODIFY_EVENT_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case 'MODIFY_CENTER_EVENT': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'MODIFY_CENTER_EVENT_FAILS': {
      const { error } = action.payload;
      return {
        getEventError: error,
      };
    }
    case 'MODIFY_CENTER_EVENT_SUCCESS': {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }
    case 'DELETE_CENTER_EVENT': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'DELETE_CENTER_EVENT_FAILS': {
      const { error } = action.payload;
      return {
        getEventError: error,
      };
    }
    case 'DELETE_CENTER_EVENT_SUCCESS': {
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
