import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from "../../actions/productListAction";
//import { createEmployee, getEmployees } from '../../actions/employeeAction';

const NewProduct = () => {
  const [productData, setproductData] = useState({ name: '', image: '',imageName:'', brand: '', category: '', description: '', price: '', countInStock: ''});
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
 // const dispatchEmp = useDispatch();
 // const employees = useSelector((state) => state)
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();    
    const form = e.currentTarget;
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('image', productData.image, productData.imageName);
    formData.append('brand', productData.brand);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('countInStock', productData.countInStock);

    if (form.checkValidity() === false || Object.keys(formErrors).length > 0) {
      setFormErrors(validate(productData));      
      console.log(formErrors);  
      e.stopPropagation();
    } else {
      dispatch(createProduct(formData));
      navigate('/home');
    }
    setIsSubmit(true);
  }

  const validate = (values) => {
    // const pattern = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$";
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //const existEmail = employees.filter(employee => employee.email === values.email);
    const errors = {};

    if(!values.name)
      errors.name = "Your name is required!";

    if(!values.brand) {
      errors.brand = "Your brand is required!";
    } 
    
    // if(values.email && existEmail.length === 1) {
    //   errors.email = "Your email is already exist!"; 
    // } 
    
    // if(values.email && !(values.email.match(pattern))) {
    //   errors.email = "Your email is not match!";
    // }

    if(!values.image)
      errors.image = "Your image is required!";
    
    if(!values.phone)
      errors.phone = "Your category is required!";

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
            <Form onSubmit={handleSubmit} noValidate validated={isSubmit} enctype="multipart/form-data">
              <Form.Group className="mb-3" controlId="formBasicName" onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required placeholder="Enter name" name="name" value={productData.name} onChange={(e) => setproductData({ ...productData, name: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Email</Form.Label>{!!formErrors.email ? 'true' : 'false'}
                <Form.Control type="email" required placeholder="Enter email" name="email" value={productData.email} onChange={(e) => setEmployeeData({ ...productData, email: e.target.value })} isInvalid={formErrors.email} />
                <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" required placeholder="Enter Image"  onChange={(e) =>  (console.log(e.target.files[0].name) , setproductData({ ...productData, image: e.target.files[0] , imageName:e.target.files[0].name}))} />
                <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" required placeholder="Enter Brand" name="brand" value={productData.brand} onChange={(e) => setproductData({ ...productData, brand: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" required placeholder="Enter Category" name="category" value={productData.category} onChange={(e) => setproductData({ ...productData, category: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.category}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" required placeholder="Enter Description " name="description" value={productData.description} onChange={(e) => setproductData({ ...productData, description: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" required placeholder="Enter Price " name="price" value={productData.price} onChange={(e) => setproductData({ ...productData, price: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
              </Form.Group>

              
              <Form.Group className="mb-3" controlId="formBasicQTY">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" required placeholder="Enter QTY " name="brand" value={productData.countInStock} onChange={(e) => setproductData({ ...productData, countInStock: e.target.value })} />
                <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>
              </Form.Group>

              
              

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

export default NewProduct;