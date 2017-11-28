import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducer/index.js";

const store = createStore(
    rootReducer, window.__INITIAL_STATE__ ,applyMiddleware(thunk)
);
export default store;