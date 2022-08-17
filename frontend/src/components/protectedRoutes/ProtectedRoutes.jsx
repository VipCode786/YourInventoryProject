import React ,{useState, useEffect}from 'react'
import { useSelector } from 'react-redux';
import {Route, useNavigate } from 'react-router-dom';

const ProtectedRoutes = (props,...rest) => {

    const navigate = useNavigate();
    let Cmp = props.Cmp
    const userSignin = useSelector((state)=> state.userSignin);
    const { userInfoData } = userSignin;
  
    const IsAdmin = userInfoData?.isAdmin === true;
    const IsProduct = userInfoData?.isProduct === true;
    const IsWarehouse = userInfoData?.isWarehouse === true; 
    const IsTransfer = userInfoData?.isTransfer === true;
    const IsGeneratePurchaseOrder = userInfoData?.isGeneratePurchaseOrder === true;
    const IsListPurchaseOrder = userInfoData?.isListPurchaseOrder === true;
    
    useEffect(()=>{
        if(!IsAdmin || !IsProduct || !IsWarehouse || !IsTransfer || !IsGeneratePurchaseOrder || !IsListPurchaseOrder)
        {
            navigate('/');
        }
    },[])
  return (
   
   <Route {...rest}
   render={(props) => <Cmp></Cmp>}></Route>
   
  )
}

export default ProtectedRoutes