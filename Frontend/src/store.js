import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import rootReducer from './Reducers/rootReducer';

export const store = createStore(rootReducer, devToolsEnhancer());

export const persistor = persistStore(store);

export default { store, persistor };
