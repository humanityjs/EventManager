import axios from 'axios';
import { GET_CENTERS_BEGIN, GET_CENTERS_ERROR, GET_CENTERS } from './types';

export function getCenters() {
  return (dispatch) => {
    dispatch({ type: GET_CENTERS_BEGIN });
    axios.get('api/v1/centers')
      .then((response) => {
        dispatch({ type: GET_CENTERS, centers: response.data.centers })
      })
      .catch((err) => {
        dispatch({ type: GET_CENTERS_ERROR, error: err.response.data });
      })
  }
}

export function centerSelected(center) {
  return {
    type: VIEW_CENTER_SELECTED,
    center,
  };
}