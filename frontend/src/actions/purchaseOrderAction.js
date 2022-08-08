import axios from "axios";


import { 
    PURCHASE_ORDER_CREATE_REQUEST,
    PURCHASE_ORDER_CREATE_SUCCESS,
    PURCHASE_ORDER_CREATE_FAIL,
    
    GET_PURCHASE_ORDER_REQUEST,
    GET_PURCHASE_ORDER_SUCCESS,
    GET_PURCHASE_ORDER_FAIL,

    GET_PURCHASE_ORDER_DETAIL_REQUEST,
    GET_PURCHASE_ORDER_DETAIL_SUCCESS,
    GET_PURCHASE_ORDER_DETAIL_FAIL
    } from "../constants/purchaseOrderConstants";


    export const purchaseOrderDetails = (id)=> async(dispatch,getState)=>{
      dispatch({type: GET_PURCHASE_ORDER_DETAIL_REQUEST, payload: id});
      try{
        const {
          userSignin: { userInfoData },
         } = getState();
          const {data} = await axios.get(`/api/purchaseOrder/${id}`,{
            headers: { Authorization: `Bearer ${userInfoData.token}` },
          });
          dispatch({type: GET_PURCHASE_ORDER_DETAIL_SUCCESS, payload: data});
      } catch(error){
       
          dispatch({type:GET_PURCHASE_ORDER_DETAIL_FAIL, 
             payload:
             error.response && error.response.data.message
             ? error.response.data.message
             :error.message,
         });
         
      }
 };


export const createPurchaseOrder = (purchaseInfo) => async (dispatch,getState) => {
    dispatch({ type: PURCHASE_ORDER_CREATE_REQUEST });
   
    try {
      const {
     userSignin: { userInfoData },
    } = getState();
      const { data } = await axios.post(
        '/api/purchaseOrder',
        {purchaseInfo},
        {
          headers: { Authorization: `Bearer ${userInfoData.token}` },
        }
      );
      dispatch({
        type: PURCHASE_ORDER_CREATE_SUCCESS,
        payload: data.purchaseInfo,
        
      });
      
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
          
      dispatch({ type: PURCHASE_ORDER_CREATE_FAIL, payload: message });
      
    }
  };


  export const purchaseOrderListing = () => async (dispatch,getState) => {
    try {
      dispatch({ type: GET_PURCHASE_ORDER_REQUEST });
      const {
        userSignin: { userInfoData },
       } = getState();
      const { data } = await axios.get(
        `/api/purchaseOrder`,{
          headers: { Authorization: `Bearer ${userInfoData.token}` },
        }
      );
      dispatch({ type: GET_PURCHASE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PURCHASE_ORDER_FAIL,
        payload:
          error.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  