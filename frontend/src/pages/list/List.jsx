import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Datatables from "../../components/datatable/Datatables"
 import Table from "../../components/table/Table"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../../actions/productListAction";

const List = () => {

   const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, productLists, error } = productList;
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <Table/> */}
        <div>
          <h1>Redux Thunk Tutorial</h1>
          {loading ? (
            <h2>Loading ....</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (

            (
              <Table  productLists={productLists} />
            )
            // <div>
            //  {
            //   productLists.map((productLists) => (
            //     <Table productLists={productLists}/>
            //   ))
            // }
            // </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default List