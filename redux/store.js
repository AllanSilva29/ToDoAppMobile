import { configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";

// const middlewares = () => {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => new Tuple(),
});

export default store;
