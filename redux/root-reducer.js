import { combineReducers } from "redux";
import todoReducer from "./todo/todoReducer";

const rootReducer = combineReducers({
  todoStore: todoReducer,
});

export default rootReducer;
