import "./newEquipment.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { productInputs } from "../../formSource";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const NewEquipment = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
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
    const { id, value } = e.target;
    console.log(`id: ${id}, value: ${value}`);
    setInfo((prev) => ({
      ...prev,
      [id === 'descreption' ? 'description' : id]: value,

    
      category: id === "category" ? value : prev.category,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Final Info before API call:", info);
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
        image: url,
      };
  
      console.log("New Equipment:", newEquipment); // Log the data
  
      const response = await axios.post("/products", {
        ...newEquipment,
        category: info.categoryId,
      });      console.log("Server Response:", response.data);
      console.log("Product successfully added!");
      navigate('/products');
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  

  console.log(info);

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

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.id}</label>
                  {input.id === "category" ? (
                    <select id="category" onChange={handleChange} value={info.category || ""}>
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
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
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEquipment;
