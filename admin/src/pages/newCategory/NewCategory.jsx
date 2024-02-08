import "./newCategory.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { categoryInputs } from "../../formSource";
import axios from "axios";

const NewCategory = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [showToast, setShowToast] = useState(false); // State to control the toast visibility

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
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
      const newCategory = {
        ...info,
        image: url,
      };
      await axios.post("/categories", newCategory);
      setShowToast(true); // Show toast
      setTimeout(() => {
        window.location.href = "/categories"; // Redirect to /categories after toast fades out
      }, 2500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Category</h1>
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
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {categoryInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.id}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
            {/* Conditionally render the toast */}
            {showToast && <div className="toast">Your category has been created</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
