import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import StoreIcon from "@mui/icons-material/Store";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const handleLogout = async () => {
    // Redirect to the login page on a different port
      window.location.href = 'http://localhost:3000';
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin-panel" style={{ textDecoration: "none" }}>
          <span className="logo">OSIadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
          <Link to="/admin-panel" style={{ textDecoration: "none" }}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
            </Link>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Equipments</span>
            </li>
          </Link>
          <Link to="/rental" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Rentals</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
           

            <span onClick={handleLogout}>Logout</span>
          
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
