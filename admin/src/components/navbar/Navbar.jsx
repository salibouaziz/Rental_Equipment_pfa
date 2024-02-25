import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/notifications');
      setNotifications(response.data);
      setUnreadCount(response.data.filter(notification => !notification.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/notifications/${id}`);
      setUnreadCount(prevCount => prevCount - 1);
      fetchNotifications(); // Refresh notifications after marking one as read
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/notifications/${id}`);
      setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (unreadCount > 0) {
      markAsRead(); // Mark all notifications as read when dropdown is opened
    }
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" onClick={toggleDropdown} />
            {unreadCount > 0 && <div className="counter">{unreadCount}</div>}
            <div className="dropdown-content">
              {notifications.map(notification => (
                <div
                key={notification._id}
                className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
                onClick={() => markAsRead(notification._id)}
              >
                {notification.message}
                <CloseIcon onClick={() => deleteNotification(notification._id)} className="close-icon" />
              </div>
              ))}
            </div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          {/* Dropdown menu */}
          <div className="item" onClick={toggleDropdown}>
            <ListOutlinedIcon className="icon" />
            {/* Dropdown content */}
            {showDropdown && (
              <div className="dropdown-content-links">
                <Link to="/admin-panel">Dashboard</Link>
                <Link to="/users">Users</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/products">Equipments</Link>
                <Link to="/rental">Rentals</Link>
              </div>
            )}
          </div>
          <div className="item">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
