import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { auth } from './auth';

// All reducers need to be imported and put in here
export default combineReducers({
  auth,
  form: reduxFormReducer,
});
