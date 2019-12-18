import { combineReducers } from "redux";

import { testReducer as test } from "./testReducer";
import { counterReducer as counter } from "./counterReducer";
const reducers = combineReducers({
  test,
  counter
});

export default reducers;
