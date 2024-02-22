import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"; // Import the icon
import { Link } from 'react-router-dom';

const Widget = ({ type }) => {
  let data;
  let shadowColor;



  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: <Link to="/users">See all users</Link>,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      shadowColor = "rgba(255, 0, 0, 0.2)";
      break;
    case "rental":
      data = {
        title: "RENTALS",
        isMoney: false,
        link: <Link to="/rentals">View all Rentals</Link>,
        icon: (
          <LocalOfferOutlinedIcon // Update the icon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      shadowColor = "rgba(218, 165, 32, 0.2)";
      break;
    case "categories":
      data = {
        title: "CATEGORIES",
        isMoney: true,
        link: <Link to="/categories">View all Categories</Link>,
        icon: (
          <CategoryOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      shadowColor = "rgba(0, 128, 0, 0.2)";
      break;
    case "products":
      data = {
        title: "EQUIPMENTS",
        isMoney: true,
        link: <Link to="/products">View all Equipments</Link>,
        icon: (
          <BuildOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      shadowColor = "rgba(128, 0, 128, 0.2)";
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={{ boxShadow: `2px 4px 10px 1px ${shadowColor}` }}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
