
import { GET_ALL_CENTERS, VIEW_CENTER_SELECTED } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CENTERS:
      return [
        ...state,
        {
          centers: action.centers,
        },
      ];
    case VIEW_CENTER_SELECTED:
      return [
        ...state,
        {
          center: action.center,
        },
      ];
    default: return state;
  }
};
