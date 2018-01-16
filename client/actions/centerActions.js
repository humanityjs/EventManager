import axios from 'axios';
// import { GET_CENTERS_BEGIN, GET_CENTERS_ERROR, GET_CENTERS } from './types';
export function uploadImage(id, data) {
  return (dispatch) => {
    dispatch({ type: 'ADD_IMAGE' });
    axios.post('https://api.cloudinary.com/v1_1/kalel/image/upload', data)
      .then((response) => {
        dispatch({ type: 'ADD_IMAGE_SUCCESS', payload: response.data });
        dispatch({ type: 'MODIFY_CENTER' });
        const imageData = {
          image_url: response.data.secure_url,
        }
        axios.put(`api/v1/centers/${id}`, imageData).then((res) => {
          dispatch({ type: 'MODIFY_CENTER_SUCCESS', payload: res });
        }).catch((err) => {
          dispatch({ type: 'MODIFY_CENTER_FAILS', payload: err });
        });
      }).catch((err) => {
        dispatch({ type: 'ADD_IMAGE_FAILS', payload: err.response });
      });
  };
}
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

export function addCenter(data) {
  return (dispatch) => {
    dispatch({ type: 'ADD_CENTER' });
    axios.post('api/v1/centers', data).then((response) => {
      dispatch({ type: 'ADD_CENTER_SUCCESS', payload: response });
    }).catch((err) => {
      dispatch({ type: 'ADD_CENTER_FAILS', payload: err.response.data });
    });
  };
}

export function modifyCenter(data, centerId) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_CENTER' });
    axios.put(`api/v1/centers/${centerId}`, data).then((res) => {
      dispatch({ type: 'MODIFY_CENTER_SUCCESS', payload: res });
      axios.get(`api/v1/centers/${centerId}`).then((response) => {
        dispatch({ type: 'GET_CENTER_SUCCESS', payload: response.data });
      }).catch((err) => {
        dispatch({ type: 'GET_CENTER_FAILS', payload: err });
      });
    }).catch((err) => {
      dispatch({ type: 'MODIFY_CENTER_FAILS', payload: err.response.data });
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
      dispatch({ type: 'GET_CENTER_FAILS', payload: err.response.data });
    });
  };
}

export function deleteCenter(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_CENTER' });
    axios.delete(`api/v1/centers/${id}`).then(() => {
      dispatch({ type: 'DELETE_CENTER_SUCCESS' });
      axios.get('api/v1/centers').then((response) => {
        dispatch({ type: 'GET_CENTERS_SUCCESS', payload: response.data });
      }).catch((err) => {
        dispatch({ type: 'GET_CENTERS_FAILS', payload: err.response.data });
      });
    }).catch((err) => {
      dispatch({ type: 'DELETE_CENTER_FAILS', payload: err.response.data });
    });
  };
}
