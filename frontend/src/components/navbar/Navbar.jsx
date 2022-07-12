import "./navbar.scss";
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Navbar() {
    return (
      <div className="navbar">
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder="   Search....."/><ManageSearchRoundedIcon/>
            </div>
            <div className="items">
                <div className="item">
                    <AccountCircleRoundedIcon/>
                </div>
                

            </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;