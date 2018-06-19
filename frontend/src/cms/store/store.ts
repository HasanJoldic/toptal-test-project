import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "../reducers";
//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

//const store = createStoreWithMiddleware(reducers);


const persistConfig = {
  key: "toptal-cms",
  storage,
  whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(thunk)
));


// without persist
// const store = createStore(reducers, composeEnhancers(
//   applyMiddleware(thunk)
// ));

export const persistor = persistStore(store);

export default store;
