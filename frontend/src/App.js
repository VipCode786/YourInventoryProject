import Home from "./pages/home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./pages/productList/ProductList";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import ProductEdit from "./pages/productEdit/ProductEdit";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NewProduct from "./pages/newProduct/NewProduct";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="users">
          {/* <Route index element={<ProductList/>}/> */}
          <Route path=":userId" element={<Single/>}/>
          {/* <Route path="new" element={<New/>}/>         */}
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
