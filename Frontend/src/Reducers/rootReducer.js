import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import credentialReducer from './credentialReducer';
import studentReducer from './studentReducer';
import employerReducer from './employerReducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  credentials: credentialReducer,
  student: studentReducer,
  employer: employerReducer
});

export default persistReducer(persistConfig, rootReducer);
