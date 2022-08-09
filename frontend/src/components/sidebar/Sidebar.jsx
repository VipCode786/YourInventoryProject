import "./sidebar.scss";
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import MonitorHeartRoundedIcon from '@mui/icons-material/MonitorHeartRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import {BrowserRouter as Router,Link, NavLink} from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
    
    const userSignin = useSelector((state)=> state.userSignin);
    const { userInfoData } = userSignin;
  
    const IsAdmin = userInfoData?.isAdmin === true;
    const IsProduct = userInfoData?.isProduct === true;
    const IsWarehouse = userInfoData?.isWarehouse === true; 
    const IsTransfer = userInfoData?.isTransfer === true;
    const IsGeneratePurchaseOrder = userInfoData?.isGeneratePurchaseOrder === true;
    const IsListPurchaseOrder = userInfoData?.isListPurchaseOrder === true;

    // console.log(typeof IsAdmin)
    // console.log(IsAdmin)
    
    return (
      <div className="sidebar">
       <div className="top"> 
            <span className="logo"> Menu </span>
       </div>
       <hr/>
       <div className="center">
      { <ul>
            <Link to= "/" className="link">
            <li><GridViewRoundedIcon className="icon"/><span> DashBoard</span></li>
            </Link>
        </ul>
      }
         {!userInfoData && <ul>
            <Link to="/logIn" className="link"> 
            <li><LoginRoundedIcon className="icon"/><span> Sign In</span></li>
            </Link>
            {/* <Link to= "/">
            <li><GridViewRoundedIcon className="icon"/><span> DashBoard</span></li>
            </Link> */}
        </ul>
      }
           {IsAdmin && ( <ul>
            <Link to="/users" className="link">
            <li><SupervisedUserCircleRoundedIcon className="icon"/><span> Users</span></li>
            </Link>
            </ul>)}
                
            {IsProduct && ( <ul>
            <Link to="/products" className="link">
                <li><Inventory2RoundedIcon className="icon"/><span> Products</span></li>
            </Link>
            </ul>
            )}

             {IsWarehouse && (
            <ul>
            <Link to="/warehouses" className="link"> 
                <li><ProductionQuantityLimitsRoundedIcon className="icon"/><span> WareHouse</span></li>
            </Link>  
            </ul>
             )}

            {IsTransfer && (
            <ul>
            <Link to="/transfer" className="link"> 
                <li><LocalShippingRoundedIcon className="icon"/><span> Transfer</span></li>
            </Link>
            </ul>
            )}

            {IsGeneratePurchaseOrder && (
            <ul>
            <Link to="/purchaseOrder" className="link"> 
                <li><QueryStatsRoundedIcon className="icon"/><span>Generate Purchase Order </span></li>
            </Link>
            </ul>
            )}

            {IsListPurchaseOrder && (
            <ul>
            <Link to="/purchaseOrder/purchaseOrderList" className="link"> 
                <li><CircleNotificationsRoundedIcon className="icon"/><span> Purchase Orders </span></li>
            </Link>
            </ul>
            )}

        {/* <ul>
            <li><MonitorHeartRoundedIcon className="icon"/><span> SystemHealth</span></li>
        </ul>
        <ul>
            <li><PsychologyRoundedIcon className="icon"/><span>Logs</span></li>
        </ul>
        <ul>
            <li><SettingsApplicationsRoundedIcon className="icon"/><span>Setting</span></li>
        </ul>
        <ul>
            <li><AccountCircleRoundedIcon className="icon"/><span>Profile</span></li>
        </ul>
        <ul>
            <li><ExitToAppRoundedIcon className="icon"/><span>Logout</span></li>
        </ul> 
              */}
        </div>
      
      </div>
    );
  }
  
  export default Sidebar;