import React, { useMemo, useState } from 'react'
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from '../../actions/userActions';
import Pagination from '../Pagination/Pagination';

let PageSize = 10;

const UserTable = ({userLists}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return userLists.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


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
      
       {currentTableData?.map((user) => (
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
    <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={userLists.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
  </div>
  )
}

export default UserTable