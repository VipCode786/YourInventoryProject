import React from 'react'
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteWarehouse } from '../../actions/warehouseAction';

const WarehouseTable = ({warehouseLists}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const deleteHandler = (warehouse) => {
    if (window.confirm('Are you sure to delete?'))
    {
      dispatch(deleteWarehouse(warehouse._id));
    }
    navigate('/')
  }

  return (
    <div className="datatable">
    
  
  <table >
      <thead>
        <tr>
         
          <th>User Name</th>
          <th>Email </th>
          <th>Phone </th>
          <th>Address</th>
          <th>Actions</th>
          
        </tr>
      </thead>

      {/* <tbody>
          <tr>
            <td>{productLists.name}</td>
            
          </tr>
        </tbody> */}
      
       {warehouseLists.map((warehouse) => (
        <tbody >
          <tr >
            
            <td>{warehouse.name}</td>
            <td>{warehouse.email}</td>
            <td>{warehouse.phone}</td>
            <td>{warehouse.address}</td>
           
            <td className="cellAction">
             <button type="button"  className="viewButton"
             onClick={() =>
              navigate(`/warehouses/${warehouse._id}`)
            }
            >
                  Edit
                </button>
                <button type="button"  className="deleteButton" 
                 onClick={() => deleteHandler(warehouse)}
                 >
                  Delete
                </button>
              </td>
          </tr>
        </tbody>
      ))}
    </table>
  </div>
  )
}

export default WarehouseTable