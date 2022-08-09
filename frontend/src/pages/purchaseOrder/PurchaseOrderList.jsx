import React, { useEffect, useMemo, useState } from "react";
import './purchaseOrder.scss'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from '../../components/Pagination/Pagination';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { purchaseOrderListing } from "../../actions/purchaseOrderAction";

//import { warehouseListAction } from "../../actions/warehouseAction";

let PageSize = 10;
let pro
const PurchaseOrderList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setsearchTerm] = useState("");

 


  const dispatch = useDispatch();
  const purchaseOrderList = useSelector((state) => state.purchaseOrderList);
  const { loading, purchaseOrderLists, error } = purchaseOrderList;
  useEffect(() => {
   
    dispatch(purchaseOrderListing());
   
   
  }, [dispatch])


 
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;




   const navigate = useNavigate();
 

  return (

    
<>

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
    <div className="datatable">
      <div className="datatableTitle">
        Purchase Order List
        {/* <Link to="/products/addProduct" className="link">
          Add New
        </Link> 
        <Link to="/purchaseOrder/PurchaseOrderConfirmation" className="link" state={{ from: peopleInfo }}>
        Next Step
        </Link>*/}
      </div>
      <input type="text" placeholder="Search Product" 
      onChange={(e) => {
        setsearchTerm(e.target.value)
      }}/> 
      <table >
        <thead>
          <tr>
          
           
            <th>Purchase Order Number</th>
            <th>Created At  </th>
            <th>Updated At  </th>
            <th></th>
          </tr>
        </thead>

        {/* <tbody>
            <tr>
              <td>{productLists.name}</td>
              
            </tr>
          </tbody> */}

        { purchaseOrderLists.filter((val)=>{
               // console.log(val)
              if( searchTerm === ''){
                return val;
              } else if( val._id.includes(searchTerm))
              {
                // console.log("val.warehouse", val.length)
                return val;
                
              }

              }).slice(firstPageIndex, lastPageIndex).map((purchase) => (
          <tbody >
           
            <tr key={purchase._id}>
            
              <td>{purchase._id}</td>
              <td>{purchase.createdAt}</td>
              <td>{purchase.updatedAt}</td>
              <td className="cellAction">
                 <button type="button" className="viewButton"
                  onClick={() =>
                    navigate(`/purchaseOrder/${purchase._id}`)
                  }> Details
                  </button>
                  </td>
              {/* <td>{product.brand}</td>
              <td>{product.category}</td>
             
              <td>{product.countInStock}</td>
              <td>{product.warehouse}</td> */}
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
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={purchaseOrderLists.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>

)}
</div>
</div>
</div>
</>

  );
};

export default PurchaseOrderList;