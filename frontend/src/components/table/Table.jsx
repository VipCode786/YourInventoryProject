import React from "react";

const Table = ({ productLists }) => {
  return (
    <div>
      <h1>User Comp</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>QTY</th>
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
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Table;