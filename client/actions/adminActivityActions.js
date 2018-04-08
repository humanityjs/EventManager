import axios from 'axios';

export function getAdminActivity() {
  return (dispatch) => {
    dispatch({ type: 'GET_ACTIVITIES' });
    axios.get('api/v1/adminactivity').then((response) => {
      dispatch({ type: 'GET_ACTIVITIES_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_ACTIVITIES_FAILS', payload: err.response });
    });
  };
}

export function setAdminActivity(data) {
  return (dispatch) => {
    dispatch({ type: 'SET_ADMINACTIVITY' });
    axios.post('api/v1/adminactivity', data).then((response) => {
      dispatch({ type: 'SET_ADMINACTIVITY_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'SET_ADMINACTIVITY_FAILS', payload: err.response.data });
    });
  };
}
