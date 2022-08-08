import React, { useEffect, useMemo, useRef, useState } from "react";
import store from "../../store";
import './purchaseOrder.scss'
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, productListAction } from "../../actions/productListAction";
import Pagination from '../../components/Pagination/Pagination';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//import { warehouseListAction } from "../../actions/warehouseAction";
import $ from 'jquery'
import { createPurchaseOrder } from "../../actions/purchaseOrderAction";
import { PURCHASE_ORDER_CREATE_RESET } from "../../constants/purchaseOrderConstants";
import toast, { Toaster } from 'react-hot-toast';


let PageSize = 10;
const PurchaseOrderConfirmation = () => {

  // //Using state to keep track of what the selected fruit is
  // let [warehouseName, setwarehouseName] = useState("⬇️ Select a fruit ⬇️")

  var total = 0;
 
  
       


  const [purchaseQTY , setPurchaseQTY] = useState([]);
  const [purchaseInfo, setPurchaseInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setsearchTerm] = useState("");
  const dispatch = useDispatch();
  const submitDispatch = useDispatch();
  const purchaseOrder = useSelector((state) => state.purchaseOrder);
  const { loading, success, purchaseProducts, error } = purchaseOrder;

  let inputRef = useRef(null)

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch])

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const navigate = useNavigate();
    
  const location = useLocation()
  const { from } = location.state
  useEffect(() => {
    console.log(from);
  }, [from]);

  useEffect(() => {
    console.log("Total Price",total);
  }, [total]);

  useEffect(() => {
    console.log("purchaseInfo",purchaseInfo);
  }, [purchaseInfo]);


 

  $(":checkbox").on("change", function() {
    var chx = $(this).is(':checked');
    $(this).closest('tr').find('input[type="number"], select').prop("disabled", chx);
  });


  $(":checkbox").on("click", function () {
    var v = $(this).closest("tr").find("input[name='rank'],select").val();
    setPurchaseQTY(v)
 });

//   $(".add").on("click", function () {
//     var v = $(this).closest("tr").find("input[name='rank']").val();
//     alert(v);
//  });
  // $('input[type="number"]').on('change',function(){
  //   $(this).closest('tr').find('input[type="checkbox"]').attr( 'checked', 'checked' );

  //   });


  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     store.dispatch({ type: "CHANGE_INPUT", val: purchaseQTY });
  //   }, 2000 )})

  console.log("closet",error)
    
  const handleSubmit=(purchaseInfo)=>{
    if(purchaseInfo.length > 0)
    {
      submitDispatch(createPurchaseOrder(purchaseInfo));
    }
  }

  
  useEffect(() => {
    if (success) { 
      
      
      dispatch({ type: PURCHASE_ORDER_CREATE_RESET });
      navigate("/")
      
    }
 if(error){
  return toast.error("Something went wrong",{
    
  })
 }
  }, [dispatch, purchaseProducts ,navigate, success,error]);
  

  return (

    

    <>

<div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <Table/> */}
        <div>
          {loading ? 
          (
            <h2>Loading ....</h2>
          ) 
          // :error ? (
          //   <>
          //   <h2>{"Something went wrong"}</h2>
          //   {window.location.reload()}
          //   </>
          // )
          :
           ( 
            <>
    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        {/* <Link to="/products/addProduct" className="link">
          Add New
        </Link> */}
        {/* <Link to="/onboarding/profile" className="link" state={{ from: "peopleInfo" }}>
        Next Step
        </Link> */}
      </div>
      <input  type="text" placeholder="Search Product" 
      onChange={(e) => {
        setsearchTerm(e.target.value)
      }}/> 
      <table >
        <thead>
          <tr>
          
            
            <th>Product Name</th>
            <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>Quantity In Stock</th>
            <th>Warehouse</th>
            <th>Enter Quantity</th>
            
          </tr>
        </thead>

        {/* <tbody>
            <tr>
              <td>{productLists.name}</td>
              
            </tr>
          </tbody> */}

        { from.filter((val)=>{
                //console.log(val)
              if( searchTerm === ''){
                return val;
              } else if( val.name.toLowerCase().includes(searchTerm.toLowerCase()))
              {
               // console.log("val.warehouse", val.length)
                return val;
                
              }

              }).slice(firstPageIndex, lastPageIndex).map((product) => (
          <tbody >
           
            <tr key={product.id}>
            {/* {(() => setColor("blue"))} */}
              <td >{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
              <td>{product.warehouse}</td>
              {/* <td>

                <select onChange={handlewarehouse}>
                  <option value="⬇️ Select a fruit ⬇️"> -- Select a fruit -- </option>
                  {warehouseLists.map((warehouse) => <option value={warehouse.name}>{warehouse.name}</option>)}
                  
                </select>

              </td> */}
              <td >
              
              <input
                type="number"
                id="EnterQTY"
                required={true}
                name='rank'
                
                onBlur={(e) => ((setPurchaseQTY(e.target.value)))}

            
              //   , setPurchaseInfo([
              //   ...purchaseInfo,
              //   {
              //     id: product.id,
              //     name: product.name,
              //     brand: product.brand,
              //     price: product.price,
              //     category: product.category,
              //     countInStock: product.countInStock,
              //     warehouse: product.warehouse,
              //     purchaseQTY: purchaseQTY
              //   },
              // ]))}
          ></input> 

                      
<input
 onChange={(e) => {
    
       // add to list
    if (e.target.checked) {
     
     
         console.log("Selected value")
      (setPurchaseInfo([
        ...purchaseInfo,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          category: product.category,
          countInStock: product.countInStock,
          warehouse: product.warehouse,
          purchaseQTY: purchaseQTY,
          TotalPrice: product.price * purchaseQTY
        },
      ]));
    } else 
    {
      // remove from list
      setPurchaseInfo(
        purchaseInfo.filter((people) => people.id !== product.id),
      );
    }
  }}
  
  value={purchaseInfo}
  style={{ margin: '20px' }}
  type="checkbox"
  id=":checkbox"
  className="add"
 
/>            
              
              </td>
              
            </tr>
          </tbody>
        ))}
      </table>
      

<h3>See the result table</h3>
    
      <table >
        <thead>
          <tr>
          
            
            <th>Product Name</th>
            <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>Quantity In Stock</th>
            <th>Warehouse</th>
            <th>Order Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>

        {/* <tbody>
            <tr>
              <td>{productLists.name}</td>
              
            </tr>
          </tbody> */}

        { purchaseInfo.filter((val)=>{
                //console.log(val)
              if( searchTerm === ''){
                return val;
              } else if( val.name.toLowerCase().includes(searchTerm.toLowerCase()))
              {
               // console.log("val.warehouse", val.length)
                return val;
                
              }

              }).slice(firstPageIndex, lastPageIndex).map((item) => (
          <tbody >
           
            <tr >
            {/* {(() => setColor("blue"))} */}
              <td >{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.countInStock}</td>
              <td>{item.warehouse}</td>
              <td>{item.purchaseQTY} </td>
              <td>{item.price * item.purchaseQTY}</td>
              {/* <td>

                <select onChange={handlewarehouse}>
                  <option value="⬇️ Select a fruit ⬇️"> -- Select a fruit -- </option>
                  {warehouseLists.map((warehouse) => <option value={warehouse.name}>{warehouse.name}</option>)}
                  
                </select>

              </td> */}
            
            </tr>
          </tbody>

        ))}
      </table>
     { purchaseInfo.forEach(item => {
    total += item.TotalPrice;
    })}

    
      <div className="infoTable">
              <div>
                <button type="button" onClick={() => handleSubmit(purchaseInfo)} >
                  Submit
                </button>
                </div>
                <Toaster position="top-center" reverseOrder={false}
/>
              <div>
                <p>Total Price: {  total}</p>
              </div>

      </div>
      {/* <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={productLists.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      /> */}
    </div>
      {/* <div>
                <button type="button" onClick={() => handleSubmit(purchaseInfo)} >
                  Submit
                </button>
              </div> */}
      {/* <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={productLists.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      /> */}
    

    </>

)}

</div>
</div>
</div>
    </>
  );
};

export default PurchaseOrderConfirmation;