import React from 'react'
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from '../../actions/userActions';

const UserTable = ({userLists}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();



  const deleteHandler = (user) => {
    if (window.confirm('Are you sure to delete?'))
    {
      dispatch(deleteUser(user._id));
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
      
       {userLists.map((user) => (
        <tbody >
          <tr >
            
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
           
            <td className="cellAction">
             <button type="button"  className="viewButton"
             onClick={() =>
              navigate(`/users/${user._id}`)
            }
            >
                  Edit
                </button>
                <button type="button"  className="deleteButton" 
                 onClick={() => deleteHandler(user)}
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

export default UserTable