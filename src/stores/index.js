import { createStore, applyMiddleware } from "redux";
import reducers from "../reducers";
// create store
// applyMiddleware thunk
const store = createStore(reducers);

export default store;
