import { combineReducers } from 'redux';
import auth from './auth'
import alert from './alert'
import loader from './loader'
import dialog from './dialog'
import records from './records'

export default combineReducers({
    loader,
    auth,
    alert,
    dialog,
    records
});
  