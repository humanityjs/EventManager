import axios from 'axios';
// import { GET_CENTERS_BEGIN, GET_CENTERS_ERROR, GET_CENTERS } from './types';

export function getCenters(data) {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTERS' });
    let query;
    if (data) {
      query = axios.get('api/v1/centers', {
        params: {
          location: data.location,
          facilities: data.facilities,
        }
      })
    } else {
      query = axios.get('api/v1/centers')
    }
    query.then((response) => {
      dispatch({ type: 'GET_CENTERS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTERS_FAILS', payload: err });
    });
  };
}

export function addCenter(data) {
  return (dispatch) => {
    dispatch({ type: 'ADD_CENTER' });
    axios.post('api/v1/centers',data).then((response) => {
      dispatch({ type: 'ADD_CENTER_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'ADD_CENTER_FAILS', payload: err.response.data.message });
    });
  };
}

export function modifyCenter(data, centerId) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_CENTER' });
    axios.put(`api/v1/centers/${centerId}`,data).then(() => {
      dispatch({ type: 'MODIFY_CENTER_SUCCESS'});
      axios.get(`api/v1/centers/${centerId}`).then((response) => {
        dispatch({ type: 'GET_CENTER_SUCCESS', payload: response.data });
      }).catch((err) => {
        dispatch({ type: 'GET_CENTER_FAILS', payload: err });
      });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_CENTER_FAILS', payload: err.response.data.message });
    });
  };
}

export function centerSelected(center) {
  return (dispatch) => {
    dispatch({ type: 'CENTER_SELECTED', payload: center });
  };
}

export function getCenterSelected(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTER' });
    axios.get(`api/v1/centers/${id}`).then((response) => {
      dispatch({ type: 'GET_CENTER_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTER_FAILS', payload: err.response.data.message });
    });
  };
}
