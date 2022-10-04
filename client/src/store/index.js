import { combineReducers, createStore } from "redux";
import token from "./token";
// import count from "./count";

const store = createStore(combineReducers({ token }));

export default store;
