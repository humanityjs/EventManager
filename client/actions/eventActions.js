import axios from 'axios';
import { centerStatus, setActivity } from './centerActions';


export function createEvent(data) {
  const { eventinfo, centerid } = data;
  return (dispatch) => {
    dispatch({ type: 'ADD_EVENT' });
    axios.post('api/v1/events', eventinfo).then((response) => {
      dispatch({ type: 'ADD_EVENT_SUCCESS', payload: response });
      dispatch(centerStatus(centerid));
      dispatch(setActivity(data))
    }).catch((err) => {
      dispatch({ type: 'ADD_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function getEvents() {
  return (dispatch) => {
    dispatch({ type: 'GET_EVENTS' });
    axios.get('api/v1/userEvents').then((response) => {
      dispatch({ type: 'GET_EVENTS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_EVENTS_FAILS', payload: err.response });
    });
  };
}

export function getCenterEvents(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_CENTER_EVENTS' });
    axios.get(`api/v1/centerEvents/${id}`).then((response) => {
      dispatch({ type: 'GET_CENTER_EVENTS_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_CENTER_EVENTS_FAILS', error: err.response.data });
    });
  };
}

export function setCurrentEvent(event) {
  return (dispatch) => {
    dispatch({ type: 'SET_CURRENT_EVENT', payload: event })
  };
}
export function eventSelected(id) {
  return (dispatch) => {
    dispatch({ type: 'EVENT_SELECTED', payload: id });
    localStorage.setItem('eventId', id);
    dispatch(setCurrentEvent(id));
  };
}
export function getEventSelected(id) {
  return (dispatch) => {
    dispatch({ type: 'GET_EVENT' });
    axios.get(`api/v1/events/${id}`).then((response) => {
      dispatch({ type: 'GET_EVENT_SUCCESS', payload: response.data });
    }).catch((err) => {
      dispatch({ type: 'GET_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function modifyCenterEvent(id, data, centerId) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_CENTER_EVENT' });
    axios.put(`api/v1/events/${id}`, data).then((res) => {
      dispatch({ type: 'MODIFY_CENTER_EVENT_SUCCESS', payload: res });
      dispatch(getCenterEvents(centerId));
    }).catch((err) => {
      dispatch({ type: 'MODIFY_CENTER_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function modifyEvent(id, data, centerId) {
  return (dispatch) => {
    dispatch({ type: 'MODIFY_EVENT' });
    axios.put(`api/v1/events/${id}`, data).then((response) => {
      dispatch({ type: 'MODIFY_EVENT_SUCCESS', payload: response });
      dispatch(centerStatus(centerId));
    }).catch((err) => {
      dispatch({ type: 'MODIFY_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function deleteCenterEvent(id, centerId, user) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_CENTER_EVENT' });
    axios.delete(`api/v1/events/${id}`).then((res) => {
      dispatch({ type: 'DELETE_CENTER_EVENT_SUCCESS', payload: res });
      dispatch(getCenterEvents(centerId));
    }).catch((err) => {
      dispatch({ type: 'DELETE_CENTER_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function deleteEvent(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_EVENT' });
    axios.delete(`api/v1/events/${id}`).then((res) => {
      dispatch({ type: 'DELETE_EVENT_SUCCESS', payload: res });
      dispatch(getEvents());
    }).catch((err) => {
      dispatch({ type: 'DELETE_EVENT_FAILS', payload: err.response.data });
    });
  };
}

export function clearEventState() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_EVENT_STATE' });
  }
}
