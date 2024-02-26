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
    width: 250,
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
    width: 400,
  },
  {
    field: "categoryName",
    headerName: "CategoryName",
    width: 200,
   
  },
  {
    field: "quantityTotal",
    headerName: "Total Quantity",
    width: 120,
  },
  {
    field: "quantityDisponible",
    headerName: "Available Quantity",
    width: 120,
  },
  {
    field: "quantityPanne",
    headerName: "Panne Quantity",
    width: 120,
  },
  {
    field: "currentQuantity",
    headerName: "Current Quantity",
    width: 120,
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
 
  
];
// rentalColumns
export const rentalColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "product",
    headerName: "Product",
    width: 250,
    renderCell: (params) => (
      <span>{params.row.product ? params.row.product.Title : 'N/A'}</span>
    ),
  },
  {
    field: "useremail",
    headerName: "Email",
    width: 200,
    renderCell: (params) => (
      <span>{params.row.user ? params.row.user.email: 'N/A'}</span>
    ),
  }, 
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => (
      <span>{params.row.user ? params.row.user.username : 'N/A'}</span>
    ),
  }, 

  {
    field: "from",
    headerName: "From",
    width: 250,
    renderCell: (params) => (
      <span>{new Date(params.row.bookedTimeSlots.from).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
    ),
  },
  {
    field: "to",
    headerName: "To",
    width: 250,
    renderCell: (params) => (
      <span>{new Date(params.row.bookedTimeSlots.to).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
    ),
  },
  {
    field: "totalHours",
    headerName: "Total Hours",
    width: 150,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    width: 150,
  },
  {
    field: "returned",
    headerName: "Returned",
    width: 150,
    renderCell: (params) => (
      <span>{params.row.returned ? "Yes" : "No"}</span>
    ),
  },
  {
    field: "rented",
    headerName: "Rented",
    width: 150,
    renderCell: (params) => (
      <span>{params.row.rented ? "Yes" : "No"}</span>
    ),
  },
];
