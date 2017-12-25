
import { VIEW_CENTER_SELECTED } from '../actions/types';

const initialState = {
  center: {},
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case VIEW_CENTER_SELECTED:
      return {
        center: action.center,
      };
    default: return state;
  }
};
