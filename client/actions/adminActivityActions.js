import axios from 'axios';

export function getAdminActivity(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_ACTIVITIES' });
    axios.get(`api/v1/adminactivity/${id}`).then((response) => {
      dispatch({ type: 'GET_ACTIVITIES_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_ACTIVITIES_FAILS', payload: err.response });
    });
  };
}

export function setAdminActivity(data) {
  const { id } = data;
  return (dispatch) => {
    dispatch({ type: 'SET_ACTIVITY' });
    axios.post(`api/v1/adminactivity/${id}`, data).then((response) => {
      dispatch({ type: 'SET_ACTIVITY_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'SET_ACTIVITY_FAILS', payload: err.response.data });
    });
  }
}
