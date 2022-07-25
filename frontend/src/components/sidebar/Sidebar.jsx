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
import {BrowserRouter as Router,Link, NavLink} from "react-router-dom";

function Sidebar() {
    return (
      <div className="sidebar">
       <div className="top"> 
            <span className="logo"> Admin </span>
       </div>
       <hr/>
       <div className="center">
        <ul>
            <Link to= "/">
            <li><GridViewRoundedIcon className="icon"/><span> DashBoard</span></li>
            </Link>
        </ul>
        <ul>
            <Link to="/users">
            <li><SupervisedUserCircleRoundedIcon className="icon"/><span> Users</span></li>
            </Link>
        </ul>
        <ul>
        <Link to="/products">
            <li><Inventory2RoundedIcon className="icon"/><span> Products</span></li>
        </Link>
        </ul>
        <ul>
        <Link to="/warehouses"> 
            <li><ProductionQuantityLimitsRoundedIcon className="icon"/><span> WareHouse</span></li>
         </Link>  
        </ul>
        <ul>
        <Link to="/transfer"> 
            <li><LocalShippingRoundedIcon className="icon"/><span> Transfer</span></li>
        </Link>
        </ul>
        <ul>
            <li><QueryStatsRoundedIcon className="icon"/><span> Stats</span></li>
        </ul>
        <ul>
            <li><CircleNotificationsRoundedIcon className="icon"/><span> Notification</span></li>
        </ul>
        <ul>
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
        </div>
       <div className="bottom"> Color Options </div>
      </div>
    );
  }
  
  export default Sidebar;