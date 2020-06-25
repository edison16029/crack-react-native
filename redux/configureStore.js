import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'
//Persist Store
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};


export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const pReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(pReducer, preloadedState, composedEnhancers)

  const persistor = persistStore(store);

  const storeObject = {
    store : store,
    persistor : persistor
  }
  return storeObject
}