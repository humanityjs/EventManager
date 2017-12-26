import axios from 'axios';
import { VIEW_CENTER_SELECTED } from './types';

export function getCenters() {
  return dispatch => axios.get('api/v1/centers');
}

export function centerSelected(center) {
  console.log(`you clicked ${center}`);
  return {
    type: VIEW_CENTER_SELECTED,
    center,
  };
}