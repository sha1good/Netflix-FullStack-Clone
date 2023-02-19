import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ArrowDropDown,
} from "@material-ui/icons";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logOut } from "../../context/authContext/AuthActions";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const [modal, setModal] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  
  const handleLogout = () => {
    dispatch(logOut());
    history.push("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">lamaadmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
          <div className="profile">
            <ArrowDropDown className="icon" onClick={() => setModal(true)} />
            {modal && (
              <div className="option" onClick={() => setModal(false)}>
                <span>Sheriff.Adebisi</span>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
