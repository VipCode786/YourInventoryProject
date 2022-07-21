import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link,  useNavigate,  useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { updateUserProfile } from '../../actions/userActions';
import { updatedWarehouse } from '../../actions/warehouseAction';


const WarehouseEdit = () => {
    const {id} = useParams();
    console.log('useparams', id)
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userInfo= useSelector(state => state.warehouseList.warehouseLists)
    console.log("userInfo", userInfo)
    //const employees = useSelector((userInfo => userInfo._id == productId) );

    const user = useSelector((user) => id ? userInfo.filter(userInfo => userInfo._id ===id) : null);

 //  const employees = useSelector( user => (userInfo.filter(userInfo => userInfo._id === productId)));
    console.log('product', user);
 // const [employeeData, setEmployeeData] = useState({ name: '', email: '', address: '', phone: '' });
 const [userData, setuserData] = useState({ name: '', phone: '',email:'', address: ''});
 
 const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    if (user[0]) setuserData(user[0]);
  }, [user[0]])

  const handleSubmit = (e) => {
     e.preventDefault();
     const form = e.currentTarget;

    // const formData = new FormData();
    // formData.append('name', productData.name);
    // //formData.append('image', productData.image, productData.imageName);
    // formData.append('brand', productData.brand);
    // formData.append('category', productData.category);
    // formData.append('description', productData.description);
    // formData.append('price', productData.price);
    // formData.append('countInStock', productData.countInStock);

    if (form.checkValidity() === false || Object.keys(formErrors).length > 0) {
      setFormErrors(validate(userData));      
      console.log(formErrors);  
      e.stopPropagation();
    } else
      {
        dispatch(updatedWarehouse(id,userData));
        navigate('/');
      }
      
    // const validEmploy = employeeData.name && employeeData.email && employeeData.address && employeeData.phone ? true : false;

    // if (validEmploy) {
    //   dispatch(updateEmployee(id, employeeData));
    //   navigate('/');
    // }
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
           <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicName" onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required placeholder="Enter name" name="name" value={userData.name} onChange={(e) => setuserData({ ...userData, name: e.target.value })} />
               {/* <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>  */}
              </Form.Group> 

              {/* <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Email</Form.Label>{!!formErrors.email ? 'true' : 'false'}
                <Form.Control type="email" required placeholder="Enter email" name="email" value={productData.email} onChange={(e) => setEmployeeData({ ...productData, email: e.target.value })} isInvalid={formErrors.email} />
                <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
              </Form.Group> */}

           {/*<Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" required placeholder="Enter Image"  filename={productData.image} onChange={(e) =>  (console.log(e.target.files[0].name) , setproductData({ ...productData, image: e.target.files[0] , imageName:e.target.files[0].name}))} />
               <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback> 
              </Form.Group>   */}
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" required placeholder="Enter Phone" name="brand" value={userData.phone} onChange={(e) => setuserData({ ...userData, phone: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required placeholder="Enter email" name="email" value={userData.email} onChange={(e) => setuserData({ ...userData, email: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" required placeholder="Enter Address " name="Address" value={userData.address} onChange={(e) => setuserData({ ...userData, address: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

            
              

              <Button variant="success" type="submit">
                Edit
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

export default WarehouseEdit;