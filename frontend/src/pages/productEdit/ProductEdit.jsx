import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link,  useNavigate,  useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

import { createProduct, updateProduct } from '../../actions/productListAction';
import { warehouseListAction } from '../../actions/warehouseAction';

const ProductEdit = () => {
   const {id} = useParams();
   console.log('useparams', id)
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userInfo= useSelector(state => state.productList.productLists)
   console.log("userInfo", userInfo)
   const [warehouseName, setwarehouseName] = useState("⬇️ Select a warehouse ⬇️")

    //const employees = useSelector((userInfo => userInfo._id == productId) );

    const product = useSelector((user) => id ? userInfo.filter(userInfo => userInfo._id ===id) : null);

 //  const employees = useSelector( user => (userInfo.filter(userInfo => userInfo._id === productId)));
    console.log('product', product);
 // const [employeeData, setEmployeeData] = useState({ name: '', email: '', address: '', phone: '' });
 const [productData, setproductData] = useState({ name: '', brand: '', category: '', description: '', price: '', countInStock: ''});


  useEffect(() => {
    if (product[0]) setproductData(product[0]);
  }, [product[0]])

  const warehousedispatch = useDispatch();
  const warehouseList = useSelector((state) => state.warehouseList);
  const { loading, warehouseLists, error } = warehouseList;

  useEffect(() => {
    warehousedispatch(warehouseListAction());
  }, [warehousedispatch]);


  let handlewarehouse = (e) => {
    setwarehouseName(e.target.value)
  }

  
  const handleSubmit = (e) => {
     e.preventDefault();
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('image', productData.image);
    formData.append('brand', productData.brand);
    formData.append('category', productData.category);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('countInStock', productData.countInStock);
    formData.append('warehouse', warehouseName);

     dispatch(updateProduct(id,formData));
     navigate('/products');
    // const validEmploy = employeeData.name && employeeData.email && employeeData.address && employeeData.phone ? true : false;

    // if (validEmploy) {
    //   dispatch(updateEmployee(id, employeeData));
    //   navigate('/');
    // }
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
                <Form.Control type="text" required placeholder="Enter name" name="name" value={productData.name} onChange={(e) => setproductData({ ...productData, name: e.target.value })} />
               {/* <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>  */}
              </Form.Group> 

              {/* <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Email</Form.Label>{!!formErrors.email ? 'true' : 'false'}
                <Form.Control type="email" required placeholder="Enter email" name="email" value={productData.email} onChange={(e) => setEmployeeData({ ...productData, email: e.target.value })} isInvalid={formErrors.email} />
                <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
              </Form.Group> */}
           <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" required placeholder="Enter Image"  value={productData.image} onChange={(e) => setproductData({ ...productData, image: e.target.value})} readOnly />
               {/* <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>  */}
              </Form.Group> 
              
           <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file"  placeholder="Enter Image"  filename={productData.image} onChange={(e) =>  (console.log(e.target.files[0].name) , setproductData({ ...productData, image: e.target.files[0] , imageName:e.target.files[0].name}))} />
               {/* <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>  */}
              </Form.Group>  
              <Form.Group className="mb-3" controlId="formBasicBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" required placeholder="Enter Brand" name="brand" value={productData.brand} onChange={(e) => setproductData({ ...productData, brand: e.target.value })} />
                {/* <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" required placeholder="Enter Category" name="category" value={productData.category} onChange={(e) => setproductData({ ...productData, category: e.target.value })} />
                {/* <Form.Control.Feedback type="invalid">{formErrors.category}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" required placeholder="Enter Description " name="description" value={productData.description} onChange={(e) => setproductData({ ...productData, description: e.target.value })} />
                {/* <Form.Control.Feedback type="invalid">{formErrors.brand}</Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" required placeholder="Enter Price " name="price" value={productData.price} onChange={(e) => setproductData({ ...productData, price: e.target.value })} />
                {/* <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback> */}
              </Form.Group>

              
              <Form.Group className="mb-3" controlId="formBasicQTY">
                <Form.Label>QTY</Form.Label>
                <Form.Control type="text" required placeholder="Enter QTY " name="brand" value={productData.countInStock} onChange={(e) => setproductData({ ...productData, countInStock: e.target.value })} />
                {/* <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback> */}
              </Form.Group>

              
              <Form.Group controlId="formBasicSelect">
              <Form.Label>Select Warehouse</Form.Label>
              <Form.Control
                as="select"
                value={warehouseName}
                onChange={e => {
                  console.log("e.target.value", e.target.value);
                  setwarehouseName(e.target.value);
                }}
              >
                <option value="⬇️ Select a warehouse ⬇️"> -- Select a Warehouse -- </option>
                {warehouseLists.map((warehouse) => <option value={warehouse.name}>{warehouse.name}</option>)}

              </Form.Control>
              {/* <Form.Control.Feedback type="invalid">{formErrors.warehouse}</Form.Control.Feedback> */}
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

export default ProductEdit;