import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import credentialReducer from './credentialReducer';
import studentReducer from './studentReducer';
import employerReducer from './employerReducer';
import adminReducer from './adminReducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  credentials: credentialReducer,
  student: studentReducer,
  employer: employerReducer,
  admin: adminReducer,
});

export default persistReducer(persistConfig, rootReducer);
