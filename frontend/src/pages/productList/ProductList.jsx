import "./productList.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Datatables from "../../components/datatable/Datatables"
 import Table from "../../components/ProductTable/ProductTable"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../../actions/productListAction";
import ProductTable from "../../components/ProductTable/ProductTable";

const ProductList = () => {

  const [searchTerm, setsearchTerm] = useState("")
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
          {loading ? (
            <h2>Loading ....</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) : (

            
              
             
              <ProductTable  productLists={productLists} />
              
            
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

export default ProductList;