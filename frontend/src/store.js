import {compose, createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { productCreateReducer, productListReducer, productUpdateReducer, totalProductReducer } from "../src/reducers/productListReducer";
import { userRegisterReducer,
   userSigninReducer,
   userDetailsReducer,
   userUpdateProfileReducer ,
   userListReducer,
   userDeleteReducer,
   userCountReducer
 } from '../src/reducers/userReducers';

 import {
  warehouseListReducer,
  warehouseCreateReducer,
  warehouseDeleteReducer,
  warehouseUpdateReducer,
  totalWarehouseReducer,
 } from '../src/reducers/warehouseListReducer';

import { transferReducer } from "../src/reducers/transferReducer";

import { purchaseOrderReducer , 
         purchaseOrderListReducer,
         purchaseDetailsReducer,
         totalpurchaseOrderReducer
} from "../src/reducers/purchaseOrderReducer";
import { homeReducer } from "./reducers/homeReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  warehouseList: warehouseListReducer,
  warehouseCreat:warehouseCreateReducer,
  warehouseDelete: warehouseDeleteReducer,
  warehouseUpdate: warehouseUpdateReducer,
  transfer : transferReducer,
  purchaseOrder : purchaseOrderReducer,
  purchaseOrderList : purchaseOrderListReducer,
  purchaseDetails : purchaseDetailsReducer,
  userCount: userCountReducer,
  totalOrder:totalpurchaseOrderReducer,
  totalWarehouse:totalWarehouseReducer,
  totalProduct:totalProductReducer,
  home1: homeReducer
});

const intialState = {

  userSignin:{
    userInfoData: localStorage.getItem('LogInInfo')? JSON.parse(localStorage.getItem('LogInInfo')):null
  },

};

const middleware = [thunk];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  intialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;