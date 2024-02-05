import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch"
import axios from "axios";


const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    // Filter out the admin users and update the state directly
    setList(data.filter((user) => !user.isAdmin));
  }, [data]);

  const handleDelete = async (id) => {
    try {
      // Construct the appropriate URL based on the path
      const deleteUrl = path === 'users' ? `/${path}/deleteUser/${id}` : `/${path}/${id}`;

      await axios.delete(deleteUrl);
      
      // Filter out the deleted item from the current list state
      const updatedList = list.filter((item) => item._id !== id);
      
      // Update the state with the new list
      setList(updatedList);
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
      
    </div>
  );
};

export default Datatable;
