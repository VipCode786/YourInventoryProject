import "./userList.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Datatables from "../../components/datatable/Datatables"
 import Table from "../../components/ProductTable/ProductTable"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userActions";
import UserTable from "../../components/userTable/UserTable";
import { Link } from "react-router-dom";


const UserList = () => {

    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);
    const { loading, userLists, error } = userList;
    useEffect(() => {
      dispatch(listUsers());
    }, [dispatch]);
  return (
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

          (

            
              <div className="datatable">
                   <div className="datatableTitle">
                    Add New User
                        <Link to="/users/register" className="link">
                           Add New
                         </Link>
                    </div>
                    <div>
                    <UserTable  userLists={userLists} />
                    </div>
              </div>
          )
       
        )}
      </div>
    </div>
  </div>
  )
}

export default UserList;