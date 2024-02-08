import "./newEquipment.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { productInputs } from "../../formSource";
import axios from "axios";

const NewEquipment = () => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false); // State to control the toast visibility

  useEffect(() => {
    // Fetch the list of categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dk6jzdkfw/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newEquipment = {
        ...info,
        image: [url],
      };

      await axios.post("/products", newEquipment);
      // Clear form fields after successful submission
      setInfo({});
      setFile(null);
      setError(null);
      setShowToast(true); // Show toast
      setTimeout(() => {
        setShowToast(false); // Hide toast after 2.5 seconds
        window.location.href = "/products"; // Redirect to /products after toast fades out
      }, 2500);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Equipment</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor={input.id}>{input.label}</label>
                  {input.id === "categoryName" ? (
                    <select
                      id={input.id}
                      onChange={handleChange}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
                      id={input.id}
                    />
                  )}
                </div>
              ))}
              {error && <div className="error">{error}</div>}
              <button type="submit">Send</button>
            </form>
            {/* Conditionally render the toast */}
            {showToast && <div className="toast">Your equipment has been created</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEquipment;
