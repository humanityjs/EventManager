import { GET_USER_EVENTS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_EVENTS:
      return [
        ...state,
        {
          events: action.events,
        },
      ];
    default: return state;
  }
};
