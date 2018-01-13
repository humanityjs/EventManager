
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
  message: '',
  status: '',
};
export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_EVENTS': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
        error: '',
      };
    }
    case 'GET_EVENTS_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'GET_EVENTS_SUCCESS': {
      const { events } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        userEvents: events,
      };
    }
    case 'GET_CENTER_EVENTS': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'GET_CENTER_EVENTS_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'GET_CENTER_EVENTS_SUCCESS': {
      const { events } = action.payload;
      let disableDates = _.map(events, (event) => {
        return (
          event.bookedDate
        );
      });
      return {
        ...state,
        loading: false,
        loaded: true,
        centerEvents: events,
        disableDates,

      };
    }
    case 'EVENT_SELECTED': {
      return {
        ...state,
        eventSelected: action.payload,
        message: '',
        status: '',
      }
    }
    case 'GET_EVENT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'GET_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
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
        message: '',
        status: '',
      };
    }
    case 'MODIFY_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'MODIFY_EVENT_SUCCESS': {
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
    case 'MODIFY_CENTER_EVENT': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'MODIFY_CENTER_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'MODIFY_CENTER_EVENT_SUCCESS': {
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        status,
      };
    }
    case 'DELETE_CENTER_EVENT': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'DELETE_CENTER_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'DELETE_CENTER_EVENT_SUCCESS': {
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
    case 'ADD_EVENT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      }
    }
    case 'ADD_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'ADD_EVENT_SUCCESS': {
      const { message } = action.payload.data;
      const { status } = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        message,
        status, 
      }
    }
    case 'DELETE_EVENT': {
      return {
        ...state,
        loading: true,
        message: '',
        status: '',
      };
    }
    case 'DELETE_EVENT_FAILS': {
      const { message } = action.payload;
      return {
        ...state,
        error: message,
      };
    }
    case 'DELETE_EVENT_SUCCESS': {
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
    default:
      return state;
  }
};
