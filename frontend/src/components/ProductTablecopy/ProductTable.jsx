import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate   } from 'react-router-dom';
//import { deleteEmployee } from '../../actions/employeeAction';

const ProductTable = ({ productLists, index }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate ();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // const handleDelete = () => {
  //   dispatch(deleteEmployee(employee._id));
  //   handleClose();
  //   navigate('/');
  // }

  return (
    <>
      <tr>
        <th>{index}</th>
        <th>{productLists.name}</th>
        <th>{productLists.email}</th>
        {/* <th>{employee.address}</th>
        <th>{employee.phone}</th> */}
        {/* <th>
          <Link to={`/employee/edit/${employee._id}`} style={{ color: '#FFC107' }} data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></Link>
          <Link to="#" onClick={handleShow} style={{ color: '#F44336' }}><i className="material-icons"></i></Link>
        </th> */}
      </tr>
{/* 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {employee.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this Record?</p>
          <p className="text-warning"><small>This action cannot be undone.</small></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export default ProductTable;
