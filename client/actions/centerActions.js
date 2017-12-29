import axios from 'axios';
// import { GET_CENTERS_BEGIN, GET_CENTERS_ERROR, GET_CENTERS } from './types';

export function getCenters() {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTERS' });
    axios.get('api/v1/cenn,n nters').then((response) => {
      dispatch({ type: 'GET_CENTERS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTERS_FAILS', payload: err });
    });
  };
}

export function centerSelected(center) {
  return {
    type: VIEW_CENTER_SELECTED,
    center,
  };
}
