import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import './productList.scss'
import Pagination from '../../components/Pagination/Pagination';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { productListAction } from '../../actions/productListAction';
import ProductTable from '../../components/ProductTablecopy/ProductTable';

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, productLists, error } = productList;
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(6);  // setEmployeesPerPage was deleted because I don't use it

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = productLists.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //const indexPerPage = (currentEmployees.length * currentPage) - currentEmployees.length + 1;

  return (
    <div>
     <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <Table/> */}
        <div>
          <h1>Redux Thunk Tutorial</h1>
          {loading ? (
            <h2>Loading ....</h2>
          ) : error ? (
            <h2>{error}</h2>
          ) :
    
     (<div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Manage <b>Employees</b></h2>
                </div>
                <div className="col-sm-6">
                  <Link to='/employee/add' className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Employee</span></Link>
                </div>
              </div>
            </div>
            <Table responsive striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  {/* <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {!currentEmployees.length && (
                  <tr>
                    <th className="text-center" colSpan="6"><span className="bg-danger p-1 rounded text-light">No Records Found</span></th>
                  </tr>
                ) }
                {currentEmployees.length && currentEmployees.map((productLists, i) => (
                  <ProductTable key={productLists._id} index={i+1} productLists={productLists} />
                ))}
              </tbody>  
            </Table>  
            <Pagination employeesPerPage={employeesPerPage} totalEmployees={productLists.length} totalEmpThisPage={currentEmployees.length} paginate={paginate} currentPage={currentPage} />          
          </div>
        </div>
      </div> )}
      </div>
      </div>
      </div>
   
   
      </div>
  )
}

export default ProductList;