import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux'
import credentialReducer from './credentialReducer'

const persistConfig = {
  key: 'root',
  storage
};

 const rootReducer = combineReducers({
     credentials: credentialReducer
 })

export default persistReducer(persistConfig, rootReducer);
