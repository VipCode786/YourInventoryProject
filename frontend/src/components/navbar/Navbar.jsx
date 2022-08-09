import "./navbar.scss";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { signout } from "../../actions/userActions";

function Navbar() {

  const userSignin = useSelector((state)=> state.userSignin);
  const { userInfoData } = userSignin;

  const IsAdmin= userInfoData?.isAdmin === 'true';

  const dispatch = useDispatch();
  const signoutHandler = ()=>{
       dispatch(signout());
    
  }
 
    return (
      <div className="navbar">
        <div className="wrapper">
            <div className="naina">

            <h1>  Inventory Management Model </h1>
                {/* <input type="text" placeholder="   Search....."/><ManageSearchRoundedIcon/> */}
            </div>
            <div>
                {
                  userInfoData ? (
                    <div >
                    
                    <Link to="#" className="UserInfo"> {userInfoData.name}</Link>
                    <Link to = "#" className="UserInfo" onClick={signoutHandler}><Button> Sign Out</Button></Link>
                    {/* <ul className="dropdown-content">
                    <li>
                    <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                    <Link to="/orderhistory">Order History</Link>
                    </li>
                      <Link to="#signout" 
                      //onClick={signoutHandler}
                      >Sign Out</Link>
                    </ul> */}
                    
                    </div>
                  ):
                  (
                    ""
                  )}
                
                

            </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;