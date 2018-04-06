import axios from 'axios';
import store from '../store';

export function getCenters(data) {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTERS' });
    let query;

    if (data) {
      query = axios.get('api/v1/centers', {
        params: {
          location: data.location,
          facilities: data.facilities,
          capacity: data.capacity,
          capacityType: data.capacityType,
          btwValue: data.btwValue,
        },
      });
    } else {
      query = axios.get('api/v1/centers');
    }
    query.then((response) => {
      dispatch({ type: 'GET_CENTERS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTERS_FAILS', payload: err.response });
    });
  };
}
export function setCurrentCenter(center) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_CENTER', payload: center });
  };
}
export function centerSelected(center) {
  return (dispatch) => {
    dispatch({ type: 'CENTER_SELECTED', payload: center });
    localStorage.setItem('center', center);
    dispatch(setCurrentCenter(center));
  };
}
export function getCenterSelected(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTER' });
    axios.get(`api/v1/centers/${id}`).then((response) => {
      dispatch({ type: 'GET_CENTER_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTER_FAILS', payload: err.response });
    });
  };
}

export function addCenter(data) {
  return (dispatch) => {
    dispatch({ type: 'ADD_CENTER' });
    axios.post('api/v1/centers', data).then((response) => {
      dispatch({ type: 'ADD_CENTER_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'ADD_CENTER_FAILS', payload: err.response });
    });
  };
}

export function modifyCenter(data, centerId) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_CENTER' });
    axios.put(`api/v1/centers/${centerId}`, data).then((res) => {
      dispatch({ type: 'MODIFY_CENTER_SUCCESS', payload: res });
      dispatch(getCenterSelected(centerId));
    }).catch((err) => {
      dispatch({ type: 'MODIFY_CENTER_FAILS', payload: err.response.data });
    });
  };
}

export function uploadImage(data) {
  return (dispatch) => {
    dispatch({ type: 'ADD_IMAGE' });
    delete axios.defaults.headers.common['x-access-token'];
    axios.post('https://api.cloudinary.com/v1_1/kalel/image/upload', data)
      .then((response) => {
        dispatch({ type: 'ADD_IMAGE_SUCCESS', payload: response.data.secure_url });
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
      }).catch((err) => {
        axios.defaults.headers.common['x-access-token'] = localStorage.jwtToken;
        dispatch({ type: 'ADD_IMAGE_FAILS', payload: err.response });
      });
  };
}

export function deleteCenter(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_CENTER' });
    axios.delete(`api/v1/centers/${id}`).then((response) => {
      dispatch({ type: 'DELETE_CENTER_SUCCESS', payload: response });
      dispatch(getCenters());
    }).catch((err) => {
      dispatch({ type: 'DELETE_CENTER_FAILS', payload: err.response.data });
    });
  };
}

export function centerStatus(id) {
  return (dispatch) => {
    dispatch({ type: 'CENTER_STATUS_UPDATE' });
    axios.put(`api/v1/centerStatus/${id}`).then((response) => {
      dispatch({ type: 'CENTER_STATUS_UPDATE_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'CENTER_STATUS_UPDATE_FAILS', payload: err.response.data });
    });
  };
}


// export function clearState() {
//   return dispatch => {
//     const id = '';
//     dispatch({ type: 'CLEAR _CENTER_STATE', payload: id});
//   }
// }
