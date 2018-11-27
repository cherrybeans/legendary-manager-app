import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

// All reducers need to be imported and put in here
export default combineReducers({
  form: reduxFormReducer,
});
