import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import { userColumns } from "../../datatablesource";

const Single = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/getUser/${userId}`); // Concatenate userId with the URL
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
           
            <h1 className="title">Information</h1>
            {userData && (
              <div className="item">
                <img
                  src={userData.photo}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{userData.username}</h1>
                  {userColumns.map(column => (
                    <div key={column.field} className="detailItem">
                      <span className="itemKey">{column.headerName}:</span>
                      <span className="itemValue">{userData[column.field]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
