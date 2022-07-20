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

function App() {
  return (
    <div className="App">
      

     
   

     <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<LogInUser/>}/>
         <Route path="home" element={<Home/>}/> 
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
  </BrowserRouter> 
    </div>
 
  );
}

export default App;
