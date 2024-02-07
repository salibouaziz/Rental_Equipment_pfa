// userColumns
export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "username",
    headerName: "Username",
    width: 200,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          className="cellImg"
          src={params.row.photo ||  "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar"/>
        {params.row.username}
      </div>
    ),
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
  },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
  
 
];

// categoryColumns
export const categoryColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img
          className="cellImg"
          src={params.row.image}
          alt="avatar"
        />
        {params.row.name}
      </div>
    ),
  },
 
];
// productColumns
export const productColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "Title",
    headerName: "Title",
    width: 230,
      renderCell: (params) => (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.image}
            alt="avatar"
          />
          {params.row.Title}
        </div>
      ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "category",
    headerName: "Category",
    width: 250,
   
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 90,
  },
  {
    field: "rentPerHour",
    headerName: "Rent Per Hour",
    width: 120,
  },
  {
    field: "rentPerDay",
    headerName: "Rent Per Day",
    width: 120,
  },
  //{
    //field: "isAvailable",
    //headerName: "Available",
    //width: 90,
    //renderCell: (params) => <div>{params.row.isAvailable ? 'Yes' : 'No'}</div>, // Adjust the rendering as per your isAvailable field type
 // },
];
