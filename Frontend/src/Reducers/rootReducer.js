import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import credentialReducer from './credentialReducer';
import studentReducer from './studentReducer';

const persistConfig = {
  key: 'root',
  storage
};

 const rootReducer = combineReducers({
     credentials: credentialReducer,
     student: studentReducer
 })

export default persistReducer(persistConfig, rootReducer);
