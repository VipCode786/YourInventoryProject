import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { purchaseOrderDetails } from '../../actions/purchaseOrderAction';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './purchaseOrder.scss'

const PurchaseOrderDetails = () => {
  var total = 0;
var sum=0

const {id} = useParams();
console.log('useparams', id)
const navigate = useNavigate();

const purchaseDetails = useSelector((state) => state.purchaseDetails);
const { loading, purchaseOrderDetail, error } = purchaseDetails;

const dispatch= useDispatch();

console.log("PurchaseOrderDetails",purchaseOrderDetail)
useEffect(() => {
    dispatch(purchaseOrderDetails(id))
}, [dispatch],purchaseDetails)


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
            <div>
                 <h3> Purchase order Number:  {purchaseOrderDetail._id} </h3>
            <div className="datatable">
            <div className="datatableTitle">

         

          <table >
        <thead>
          <tr>
          
           
            <th>Product Name</th>
            <th>Brand  </th>
            <th>Category   </th>
            <th>Purchase QTY</th>
            <th>Price Per Unit</th>
            <th>Total Price</th>
          </tr>
        </thead>
       
          {purchaseOrderDetail.purchaseOrderItems.map((item)=>  
          <tbody>
         <tr>
         <td>{item.name}</td>
         <td>{item.brand}</td>
         <td>{item.category}</td>
         <td>{item.purchaseQTY}</td>
         <td>{item.price}</td>
         <td>{sum= item.purchaseQTY * item.price}</td>
         <p style={{visibility: "hidden"}}> {total += sum} </p>
    
    
         </tr>
         
         </tbody>

         
         )}
         


 </table>
     
        </div>
        <div>
        
                <p>Total Price :    {  total}</p>
              </div>
          </div>
             
          </div>)}
         
      </div>
      </div>
      
    </div>
  )
}

export default PurchaseOrderDetails