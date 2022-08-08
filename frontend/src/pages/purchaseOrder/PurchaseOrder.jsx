import React, { useEffect, useMemo, useState } from "react";
import './purchaseOrder.scss'
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, productListAction } from "../../actions/productListAction";
import Pagination from '../../components/Pagination/Pagination';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//import { warehouseListAction } from "../../actions/warehouseAction";

let PageSize = 10;
let  isChecked = false;
const PurchaseOrder = () => {

  // //Using state to keep track of what the selected fruit is
  // let [warehouseName, setwarehouseName] = useState("⬇️ Select a fruit ⬇️")
  const [peopleInfo, setPeopleInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setsearchTerm] = useState("");
  const [idpro, setIdPro] = useState([])
 


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, productLists, error } = productList;
  useEffect(() => {
   
    dispatch(productListAction());
   
   
  }, [dispatch])

  //console.log("productLists console",productLists)
 //const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
  // return productLists.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);

  //const [peopleInfo, setPeopleInfo] = useState({});

  // const toggleHandler = (item) => () => {
  //   setPeopleInfo((state) => ({
  //     ...state,
  //     [item._id]: state[item._id]
  //       ? null
  //       : {
  //           productId: item._id,
  //         }
  //   }));
  // };


  useMemo(() => peopleInfo, [peopleInfo])


  const nameMemo = useMemo(()=>{
    return productLists
  },[productLists]);

   useEffect(() => {
    console.log(peopleInfo);
  }, [peopleInfo]);

  useEffect(() => {
    console.log(idpro);
  }, [idpro]);

   const navigate = useNavigate();
   const deletedispatch = useDispatch();
  // const warehousedispatch = useDispatch();

  // const dispatch = useDispatch();
  // // const warehouseInfo = useSelector(state => state.warehouseList.warehouseLists)
  // // console.log("warehouseInfo", warehouseInfo)
  // const warehouseList = useSelector((state) => state.warehouseList);
  // const { loading, warehouseLists, error } = warehouseList;

  // useEffect(() => {
  //   warehousedispatch(warehouseListAction());
  // }, [dispatch]);


  // let handlewarehouse = (e) => {
  //   setwarehouseName(e.target.value)
  // }

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      deletedispatch(deleteProduct(product._id));
    }
    navigate('/')
  }
  return (

    

    <>

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
    <div className="datatable">
      <div className="datatableTitle">
        Select and click on Next button to generate a purchase order
        {/* <Link to="/products/addProduct" className="link">
          Add New
        </Link> */}
        <Link to="/purchaseOrder/PurchaseOrderConfirmation" className="link" state={{ from: peopleInfo }}>
        Next Step
        </Link>
      </div>
      <input  type="text" placeholder="Search Product" 
      onChange={(e) => {
        setsearchTerm(e.target.value)
      }}/> 
      <table >
        <thead>
          <tr>
          
            <th></th>
            <th>Product Name</th>
            <th>Brand </th>
            <th>Category </th>
            <th>Price</th>
            <th>QTY</th>
            <th>Warehouse</th>
            
            
          </tr>
        </thead>

        {/* <tbody>
            <tr>
              <td>{productLists.name}</td>
              
            </tr>
          </tbody> */}

        { productLists.filter((val)=>{
               // console.log(val)
              if( searchTerm === ''){
                return val;
              } else if( val.name.toLowerCase().includes(searchTerm.toLowerCase()))
              {
                // console.log("val.warehouse", val.length)
                return val;
                
              }

              }).slice(firstPageIndex, lastPageIndex).map((product) => (
          <tbody >
           
            <tr key={product._id}>
              <td>
               
            <input
  onChange={(e) => {
    // add to list
    if (e.target.checked) {
      setPeopleInfo([
        ...peopleInfo,
        {
          id: product._id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          category: product.category,
          countInStock: product.countInStock,
          warehouse: product.warehouse
          
        },
      ]);

      setIdPro([...idpro,product._id])
    } else {
      // remove from list
      setPeopleInfo(
        peopleInfo.filter((people) => people.id !== product._id),
      );

      setIdPro(idpro.filter((id123) => id123 !== product._id))
    }
  }}
  
  
  checked={idpro.includes(product._id)} 
  value={peopleInfo}
  style={{ margin: '20px' }}
  type="checkbox"
  
/> {console.log("peopleInfo.id",peopleInfo.filter((v)=>{if(v.id.includes(product._id)){isChecked= true} else {isChecked=false}}))}   {console.log("product._id",product._id)} {console.log(peopleInfo.includes(product._id))}       </td>
     {console.log("idpro",idpro.includes(product._id))}
              <td>
                <div className="cellWithImg">
                  <div>  <img className="cellImg" src={`/images/${product.image}`} alt="avatar" /></div>
                  <div>
                    {product.name}
                  </div>
                </div>
              </td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
              <td>{product.warehouse}</td>
              {/* <td>

                <select onChange={handlewarehouse}>
                  <option value="⬇️ Select a fruit ⬇️"> -- Select a fruit -- </option>
                  {warehouseLists.map((warehouse) => <option value={warehouse.name}>{warehouse.name}</option>)}
                  
                </select>

              </td> */}
              {/* <td className="cellAction">
              
                  <button type="button" className="viewButton"
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }>
                  Edit
                </button>
              
              
              
                <button type="button" className="deleteButton" onClick={() => deleteHandler(product)} >
                  Delete
                </button>
              
               
              </td> */}
            </tr>
          </tbody>
        ))}
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={productLists.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
    </div>

)}
</div>
</div>
</div>
    </>
  );
};

export default PurchaseOrder;