import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth from './auth';
import activeCenter from './center';

export default combineReducers({
  flashMessages,
  auth,
  activeCenter,
});
