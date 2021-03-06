import axios from 'axios';
import { setAdminActivity } from './adminActivityActions';

export function getActivity() {
  return (dispatch) => {
    dispatch({ type: 'GET_ACTIVITIES' });
    axios.get('api/v1/activity').then((response) => {
      dispatch({ type: 'GET_ACTIVITIES_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_ACTIVITIES_FAILS', payload: err.response });
    });
  };
}

export function setActivity(data) {
  return (dispatch) => {
    dispatch({ type: 'SET_ACTIVITY' });
    axios.post('api/v1/activity', data).then((response) => {
      dispatch({ type: 'SET_ACTIVITY_SUCCESS', payload: response });
      dispatch(setAdminActivity(data));
    }).catch((err) => {
      dispatch({ type: 'SET_ACTIVITY_FAILS', payload: err.response.data });
    });
  };
}

export function deleteActivity(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_ACTIVITY' });
    axios.delete(`api/v1/activity/${id}`).then((response) => {
      dispatch({ type: 'DELETE_ACTIVITY_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'DELETE_ACTIVITY_FAILS', payload: err.response.data });
    });
  };
}
