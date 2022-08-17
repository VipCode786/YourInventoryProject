import Home from "./pages/home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
//import SignInUser from "./pages/signInUser/SignInUser";
import ProductList from "./pages/productList/ProductList";
import ProductEdit from "./pages/productEdit/ProductEdit";
import UserList from "./pages/userlist/UserList";
import LogInUser from "./pages/logInUser/LogInUser";
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import UserEdit from "./pages/userEdit/UserEdit";
import WareHouseList from "./pages/warehouseList/WareHouseList";
import NewWarehouse from "./pages/newWarehouse/NewWarehouse";
import WarehouseEdit from "./pages/warehouseEdit/WarehouseEdit";
import TransferProduct from "./pages/transferProduct/TransferProduct";
import TransferTable from "./components/TransferTable/TransferTable";
import TransferSubmit from "./pages/transferSubmit/TransferSubmit";
import PurchaseOrder from "./pages/purchaseOrder/PurchaseOrder";
import { useEffect } from "react";
import PurchaseOrderConfirmation from "./pages/purchaseOrder/PurchaseOrderConfirmation";
import PurchaseOrderList from "./pages/purchaseOrder/PurchaseOrderList";
import PurchaseOrderDetails from "./pages/purchaseOrder/PurchaseOrderDetails";
import MaterialUIpurchaseOrder from "./pages/purchaseOrder/MaterialUIpurchaseOrder";


function App() {

  // useEffect(() => {
  //   const beforeunloadHandle = () => {
  //     return true;
  //   };
  
  //   window.addEventListener("beforeunload", beforeunloadHandle);
  //   return () => {
  //     window.removeEventListener("removeEventListener", beforeunloadHandle);
  //   };
  // }, []);

  return (
    <div className="App">
      

     
   
      
     <BrowserRouter>
     
    <Routes>
      <Route  path="/">
       <Route index element={<Home/>}/>
       <Route path="logIn" element={<LogInUser/>}/>
         {/*  <Route path="home" element={<Home/>}/>   */}
       </Route>
        <Route path="users">
          <Route index element={<UserList/>}/>
          <Route path="register" element={<NewUser/>}/>
          <Route path=":id" element={<UserEdit/>}/>
        </Route>
        <Route path="products">
          <Route index element={<ProductList/>}/>
          <Route path=":id" element={<ProductEdit/>}/>
          <Route path="addProduct" element={<NewProduct/>}/>        
        </Route>
        <Route path="warehouses">
          <Route index element={<WareHouseList/>}/>
          <Route path=":id" element={<WarehouseEdit/>}/>
          <Route path="add" element={<NewWarehouse/>}/>        
        </Route>
        <Route path="transfer">
          <Route index element={<TransferProduct/>}/>
          <Route path="transferSubmit/:id" element={<TransferSubmit/>}/>
          <Route path="transferProduct" element={<TransferTable/>}/>        
        </Route>
        <Route path="purchaseOrder">
          <Route index element={<PurchaseOrder/>}/>
           <Route path="purchaseOrderConfirmation" element={<PurchaseOrderConfirmation/>}/>
           <Route path="purchaseOrderList" element={<PurchaseOrderList/>}/>       
           <Route path=":id" element={<PurchaseOrderDetails/>}/> 
        </Route>
      
    </Routes>
   
  </BrowserRouter> 

  {/* <ToastContainer autoClose={5000}/>  */}
    </div>
 
  );
}

export default App;
