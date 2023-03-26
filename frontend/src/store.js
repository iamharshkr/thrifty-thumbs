import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { availableReducer, resultReducer } from "./reducers/scrapeReducer";

const reducer = combineReducers({
  availableSites: availableReducer,
  result: resultReducer,
});

let initialState = {};
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
export default store;
