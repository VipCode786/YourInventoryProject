import Home from "./pages/home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./pages/productList/ProductList";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import ProductEdit from "./pages/productEdit/ProductEdit";
import UserList from "./pages/userlist/UserList";
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import UserEdit from "./pages/userEdit/UserEdit";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      

     
    <Routes>
      <Route   path="/">
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="users">
          <Route index element={<UserList/>}/>
          <Route path="register" element={<Single/>}/>
          <Route path="new" element={<UserEdit/>}/>        
        </Route>
        {/* <Route path="products">
          <Route index element={<List/>}/>
          <Route path=":productId" element={<Single/>}/>
          <Route path="new" element={<New/>}/>        
        </Route> */}
      </Route>
    </Routes>
  

     {/* <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home/>}/>
        <Route path="Login" element={<Login/>}/>
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
      </Route>
    </Routes>
  </BrowserRouter> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
