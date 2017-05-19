import {combineReducers} from 'redux';
import lanes from './lanes';
import notes from './notes';
import user from './user';

export default combineReducers({
  lanes,
  notes,
  user
});
