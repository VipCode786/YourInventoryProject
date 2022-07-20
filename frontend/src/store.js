import {compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productCreateReducer, productListReducer, productUpdateReducer } from "../src/reducers/productListReducer";
import { userRegisterReducer,
   userSigninReducer,
   userDetailsReducer,
   userUpdateProfileReducer ,
   userListReducer,
   userDeleteReducer
 } from '../src/reducers/userReducers';

const rootReducer = combineReducers({
  productList: productListReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer
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