import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";
import todoReducer from "./todo/todoSlice";
const reducer = combineReducers({
  global: globalReducer,
  todo: todoReducer,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
