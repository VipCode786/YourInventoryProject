import React, { useEffect, useState } from "react";
import './productTable.scss'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../actions/productListAction";
//import { warehouseListAction } from "../../actions/warehouseAction";

const ProductTable = ({ productLists }) => {

  // //Using state to keep track of what the selected fruit is
  // let [warehouseName, setwarehouseName] = useState("⬇️ Select a fruit ⬇️")
  const [peopleInfo, setPeopleInfo] = useState([]);
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

   useEffect(() => {
    console.log(peopleInfo);
  }, [peopleInfo]);

   const navigate = useNavigate();
   const deletedispatch = useDispatch();
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

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      deletedispatch(deleteProduct(product._id));
    }
    navigate('/')
  }
  return (


    <div className="datatable">
      <div className="datatableTitle">
        Add New Product
        <Link to="/products/addProduct" className="link">
          Add New
        </Link>
      </div>

      <table >
        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>QTY</th>
            <th>Warehouse</th>
            <th>ACTIONS</th>

          </tr>
        </thead>

        {/* <tbody>
            <tr>
              <td>{productLists.name}</td>
              
            </tr>
          </tbody> */}

        {productLists.map((product) => (
          <tbody >
           
            <tr>
              <td>
            <input
  onChange={(e) => {
    // add to list
    if (e.target.checked) {
      setPeopleInfo([
        ...peopleInfo,
        {
          id: product._id,
          
        },
      ]);
    } else {
      // remove from list
      setPeopleInfo(
        peopleInfo.filter((people) => people.id !== product._id),
      );
    }
  }}
  value={peopleInfo}
  style={{ margin: '20px' }}
  type="checkbox"
/>            </td>
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
              {/* <td>

                <select onChange={handlewarehouse}>
                  <option value="⬇️ Select a fruit ⬇️"> -- Select a fruit -- </option>
                  {warehouseLists.map((warehouse) => <option value={warehouse.name}>{warehouse.name}</option>)}
                  
                </select>

              </td> */}
              <td className="cellAction">
                <button type="button" className="viewButton"
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }>
                  Edit
                </button>
                <button type="button" className="deleteButton" onClick={() => deleteHandler(product)} >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ProductTable;