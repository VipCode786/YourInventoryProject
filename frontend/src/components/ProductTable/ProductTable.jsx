import React from "react";
import './productTable.scss'
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
const ProductTable = ({ productLists }) => {
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
            <th>Product Name</th>
            <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>QTY</th>
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
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
              <td className="cellAction">
                  <button type="button"  className="viewButton">
                    Edit
                  </button>
                  <button type="button"  className="deleteButton" >
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