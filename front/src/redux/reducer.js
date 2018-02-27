
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as awaitReducer } from 'redux-await';
import { users, session, timezones } from './reducers';

const rootReducer = combineReducers({
  users,
  session,
  timezones,
  form: formReducer,
  awaits: awaitReducer,
  routing,
});

export default rootReducer;
