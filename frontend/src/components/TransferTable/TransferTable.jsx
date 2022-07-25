import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { useLocation } from 'react-router-dom'

const TransferTable = () => {

    const location = useLocation()
  const { from } = location.state

  console.log("from",from)
  return (
    <div>
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
    </div>
    </div>

    
    <table >
        <thead>
          <tr>
            
            <th>Product Name</th>
            {/* <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>QTY</th>
            <th>Warehouse</th>
            <th>ACTIONS</th> */}

          </tr>
        </thead>

        {/* <tbody>
            <tr>
              <td>{productLists.name}</td>
              
            </tr>
          </tbody> */}

        {from.map(() => (
          <tbody >
           
            <tr>
  
              <td>
                
                    {from.id}
                  
              </td>
              {/* <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
              <td>{product.warehouse}</td> */}
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default TransferTable