import React from "react";
import './productTable.scss'
import Table from 'react-bootstrap/Table';
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../actions/productListAction";

const ProductTable = ({ productLists }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?'))
    {
      dispatch(deleteProduct(product._id));
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
              <td className="cellAction">
               <button type="button"  className="viewButton"
               onClick={() =>
                navigate(`/products/${product._id}`)
              }>
                    Edit
                  </button>
                  <button type="button"  className="deleteButton" onClick={() => deleteHandler(product)} >
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