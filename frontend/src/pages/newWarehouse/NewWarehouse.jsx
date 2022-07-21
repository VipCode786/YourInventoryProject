import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addWarehouse } from '../../actions/warehouseAction';

const NewWarehouse = () => {



  const [userData, setuserData] = useState({ name: '', phone: '',email:'', address: '', password: ''});
  const [confirmPassword , setConfirmPassword] = useState('')
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
 // const dispatchEmp = useDispatch();
 // const userLists = useSelector((state) => state)
 const userInfo= useSelector(state => state.warehouseList.warehouseLists)
    console.log("userInfo", userInfo)
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
    } else
      {
        dispatch(addWarehouse(userData));
        navigate('/');
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
     


    return errors;
  }


  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />


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

              <Button variant="success" type="submit">
                Add
              </Button>
            </Form>

        </div>
        </div>
  )
}

export default NewWarehouse