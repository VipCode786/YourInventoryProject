import {compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productCreateReducer, productListReducer, productUpdateReducer } from "../src/reducers/productListReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
});

const intialState = {};

const middleware = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  intialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;