//TransferTable

import React, { useEffect, useState } from "react";
import './productTable.scss'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../actions/productListAction";
import { Button } from "react-bootstrap";
import TransferTable from "./TransferTable";
import { warehouseListAction } from "../../actions/warehouseAction";
//import { warehouseListAction } from "../../actions/warehouseAction";

const ProductTable = ({ productLists }) => {

  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("")
  // //Using state to keep track of what the selected fruit is
  // let [warehouseName, setwarehouseName] = useState("⬇️ Select a fruit ⬇️")
  //const [productsInfo, setproductsInfo] = useState([]);
  // const [warehouseName, setwarehouseName] = useState("")
  // const [warehouseNameDestination, setwarehouseNameDestination] = useState("")
  // const warehousedispatch = useDispatch();
  // const warehouseList = useSelector((state) => state.warehouseList);
  // const { loading, warehouseLists, error } = warehouseList;
  // useEffect(() => {
  //   warehousedispatch(warehouseListAction());
  // }, [warehousedispatch]);

  // const handleSourcewarehouse = (e) => {
  //   setwarehouseName(e.target.value)
  // }

  // const handleDestinationwarehouse = (e) => {
  //   setwarehouseNameDestination(e.target.value)
    
  // }
  //const [peopleInfo, setPeopleInfo] = useState({});

  // const toggleHandler = (item) => () => {
  //   setPeopleInfo((state) => ({
  //     ...state,
  //     [item._id]: state[item._id]
  //       ? null
  //       : {
  //           productId: item._id,
  //         }
  //   }));
  // };
  // useEffect(() => {
  //   console.log("warehouse",warehouseName);
  // }, [warehouseName]);
  // useEffect(() => {
  //   console.log("warehouseNameDestination",warehouseNameDestination);
  // }, [warehouseNameDestination]);

  //  useEffect(() => {
  //   console.log("productInfo",productsInfo);
  // }, [productsInfo]);

  //  const navigate = useNavigate();
  //  const deletedispatch = useDispatch();
  // const warehousedispatch = useDispatch();

  // const dispatch = useDispatch();
  // // const warehouseInfo = useSelector(state => state.warehouseList.warehouseLists)
  // // console.log("warehouseInfo", warehouseInfo)
  // const warehouseList = useSelector((state) => state.warehouseList);
  // const { loading, warehouseLists, error } = warehouseList;

  // useEffect(() => {
  //   warehousedispatch(warehouseListAction());
  // }, [dispatch]);


  // let handlewarehouse = (e) => {
  //   setwarehouseName(e.target.value)
  // }

  // const deleteHandler = (product) => {
  //   if (window.confirm('Are you sure to delete?')) {
  //     deletedispatch(deleteProduct(product._id));
  //   }
  //   navigate('/')
  // }
  return (


    <div className="datatable">
      <div className="datatableTitle">
       {/* <Link to="/transfer/transferProduct" state={{ from: productsInfo }}>
       Next Step
      </Link> */}

      </div>
      <input  type="text" placeholder="Search Product" 
      onChange={(e) => {
        setsearchTerm(e.target.value)
      }}/>
      {/* <select onChange={handleSourcewarehouse}> 
      <option value=""> -- Select Warehouse -- </option>
                {warehouseLists.map((warehouse) => <option value={warehouse.name}>{warehouse.name}</option>)}

    </select> */}

    {/* <select onChange={handleDestinationwarehouse}> 
      <option value=""> -- Select Warehouse -- </option>
                {warehouseLists.map((warehouse) => <option value={warehouse.name}>{warehouse.name}</option>)}

    </select> */}
    

      <table >
     
        <thead>
          <tr>
            
            <th>Product Name</th>
            <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>QTY</th>
           
            <th>Warehouse</th>
            <th>Transfer</th>

          </tr>
        </thead>

        {/* <tbody>
            <tr>
              <td>{productLists.name}</td>
              
            </tr>
          </tbody> */}
          {/* .filter(val=>{

      // .filter((val)=>{

        //       if( warehouseName === ''){
        //         return val;
        //       } else if ( val.warehouse===warehouseName)
        //       {
        //         console.log("val.warehouse", val.warehouse)
        //         return val;
        //       }

        //       })

}) */}

        {productLists
        .filter((val)=>{

              if( searchTerm === ''){
                return val;
              } else if( val.name.toLowerCase().includes(searchTerm.toLowerCase()))
              {
               
               // console.log("val.warehouse",  typeof val.name)
                return val;
              }

              })
              .map((product) => (
          <tbody >
           
            <tr>
              {/* <td>
            <input
  onChange={(e) => {
    // add to list
    if (e.target.checked) {
      setproductsInfo([
        ...productsInfo,
        {
          id: product._id,
          
        },
      ]);
    } else {
      // remove from list
      setproductsInfo(
        productsInfo.filter((deselect) => deselect.id !== product._id),
      );
    }
  }}
  value={productsInfo}
  style={{ margin: '20px' }}
  type="checkbox"
/>            </td> */}
              <td>
                <div className="cellWithImg">
                  <div>  <img className="cellImg" src={`/images/${product.image}`} alt="avatar" /></div>
                  <div>
                    {product.name}
                  </div>
                </div>
              </td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
            
              <td>{product.warehouse}</td>
              <td><button type="button" className="viewButton"
                  onClick={() =>
                    navigate(`/transfer/transferSubmit/${product._id}`)
                  }
                  >
                  Transfer
                </button></td>
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
    </div>
  );
};

export default ProductTable;