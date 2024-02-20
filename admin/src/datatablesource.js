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
    width: 300,
  },
  {
    field: "categoryName",
    headerName: "CategoryName",
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
 
  
];
//export const rentalColumns = [
  //{ field: "_id", headerName: "ID", width: 250 },
  //{ 
    //field: "product.title", // Assuming 'title' is the property you want to display
    //headerName: "Product Title", 
    //width: 250 
  //},
   //{ field: "bookedTimeSlots.from", headerName: "From", width: 200 },
   //{ field: "bookedTimeSlots.to", headerName: "To", width: 200 },
   //{ field: "totalHours", headerName: "Total Hours", width: 150 },
   //{ field: "totalAmount", headerName: "Total Amount", width: 150 },
   //{ field: "returned", headerName: "Returned", width: 150 },
 //];
