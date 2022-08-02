import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { Col, Row } from 'react-bootstrap';
//import { createEmployee, getEmployees } from '../../actions/employeeAction';

  const NewUser = () => {
  const [userData, setuserData] = useState({ name: '', phone: '',email:'', address: '', password: '', 
                                              isProduct: false, isWarehouse: false , isTransfer: false, isGeneratePurchaseOrder: false, isListPurchaseOrder: false});
  const [confirmPassword , setConfirmPassword] = useState('')
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();

  console.log("isProduct",userData.isProduct)
 // const dispatchEmp = useDispatch();
 // const userLists = useSelector((state) => state)
  const userInfo= useSelector(state => state.userList.userLists)
  //  console.log("userInfo", userInfo)
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  
    const handleSubmit = (e) => {
    e.preventDefault();    
    const form = e.currentTarget;
    // const formData = new FormData();
    // formData.append('name', userData.name);
    // formData.append('phone', userData.phone);
    // formData.append('email', userData.email);
    // formData.append('address', userData.address);
    // formData.append('password', userData.password);
    
    if (form.checkValidity() === false || Object.keys(formErrors).length > 0) {
      setFormErrors(validate(userData));      
      console.log(formErrors);  
      e.stopPropagation();
    } else if(userData.password == confirmPassword)
      {
        dispatch(register(userData));
        navigate('/');
      }
      else {
        alert('Passowrd Not matched')
      }
      
     
    
   setIsSubmit(true);
  }

  const validate = (values) => {
    // const pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$";
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    
    //const employees = useSelector((userInfo => userInfo._id == productId) );

    //const product = useSelector((user) => id ? userInfo.filter(userInfo => userInfo._id ===id) : null);
    const existEmail = userInfo.filter(userInfo => userInfo.email === userData.email);
    console.log("existEmail", existEmail)
    console.log("values.email", existEmail.length)
    console.log("values.phone",(values.phone).length)
    const numPhone = (values.phone).length;
    console.log("numPhone",numPhone)
    const errors = {};

    if(!values.name)
      errors.name = "Your name is required!";

    if(numPhone != 10 )
      errors.phone = "Enter 10 digit numbersssss!";

    
     


    if(!values.address) {
      errors.address = "Your address is required!";
    } 
    
    if(!values.email) {
      errors.email = "Your email is required!";
    } 
    
    if(values.email && existEmail.length === 1) {
      errors.email = "Your email is already exist!"; 
    } 
    
    if(values.email && !(values.email.match(pattern))) {
      errors.email = "Your email is not match!";
    }
      if(!values.password)
      errors.password = "Your category is required!";


    return errors;
  }

  // useEffect(() => {
  //  dispatchEmp(getEmployees())
  // }, [formErrors])

  return (
    <>
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
      {/* <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>Add <b>Employees</b></h2>
                </div>
                <div className="col-sm-6">
                  <Link to='/' className="btn btn-info" data-toggle="modal"><i className="material-icons">&#xe5c4;</i> <span>Back</span></Link>
                </div>
              </div>
            </div> */}
            <Form onSubmit={handleSubmit} noValidate validated={isSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicName" onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required placeholder="Enter name" name="name" value={userData.name} onChange={(e) => setuserData({ ...userData, name: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Email</Form.Label>
                {/* {!!formErrors.email ? 'true' : 'false'} */}
                <Form.Control type="email" required placeholder="Enter email" name="email" value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} isInvalid={formErrors.email} />
                <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" required placeholder="Enter Image"  onChange={(e) =>  (console.log(e.target.files[0].name) , setproductData({ ...productData, image: e.target.files[0] , imageName:e.target.files[0].name}))} />
                <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" required placeholder="Enter  10 digit Phone" min="1000000000" max="9999999999" name="phone" value={userData.phone} onChange={(e) => setuserData({ ...userData, phone: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" required placeholder="Enter Address" name="address" value={userData.address} onChange={(e) => setuserData({ ...userData, address: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Enter Password " name="password" value={userData.password} onChange={(e) => setuserData({ ...userData, password: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" required placeholder="Enter to Confirm Password " name="confirmPassword" value={userData.confirmPassword} onChange={(e) => setConfirmPassword( e.target.value )} />
                <Form.Control.Feedback type="invalid">{formErrors.confirmPassword}</Form.Control.Feedback>
              </Form.Group>

              <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="formBasicIs Product Access" >
                <Form.Label>Is Product Access</Form.Label>
                <Form.Check type="checkbox"  name="Is Product Access" value={userData.isProduct} onChange={(e) => setuserData({ ...userData, isProduct: e.target.checked  })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formBasicIs Warehouse Access" as={Col}>
                <Form.Label>Is Warehouse Access</Form.Label>
                <Form.Check type="checkbox"   name="Is Warehouse Access" value={userData.isWarehouse} onChange={(e) => setuserData({ ...userData, isWarehouse: e.target.checked  })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

              
              <Form.Group as={Col} className="mb-3" controlId="formBasicIs Transfer Access">
                <Form.Label>Is Transfer Access</Form.Label>
                <Form.Check type="checkbox"   name="Is Transfer Access" value={userData.isTransfer} onChange={(e) => setuserData({ ...userData, isTransfer: e.target.checked  })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formBasicIs Generate Purchase Order Access">
                <Form.Label>Is Generate Purchase Order Access</Form.Label>
                <Form.Check type="checkbox"   name="Is Generate Purchase Order Access" value={userData.isGeneratePurchaseOrder} onChange={(e) => setuserData({ ...userData, isGeneratePurchaseOrder: e.target.checked  })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formBasicIs List Purchase Order Access">
                <Form.Label>Is List Purchase Order Access</Form.Label>
                <Form.Check type="checkbox"   name="Is List Purchase Order Access" value={userData.isListPurchaseOrder} onChange={(e) => setuserData({ ...userData, isListPurchaseOrder: e.target.checked  })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>
              </Row>
              {/* <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" required placeholder="Enter Price " name="price" value={userData.price} onChange={(e) => setuserData({ ...userData, price: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
              </Form.Group>

              
              <Form.Group className="mb-3" controlId="formBasicQTY">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" required placeholder="Enter QTY " name="brand" value={productData.countInStock} onChange={(e) => setproductData({ ...productData, countInStock: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
              </Form.Group> */}

              
              

              <Button variant="success" type="submit">
                Add
              </Button>
            </Form>

            </div>
            </div>

          {/* </div>
        </div>
      </div> */}
    </>
  )
}

export default NewUser;