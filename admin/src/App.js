import Home from "./pages/home/Home";

import List from "./pages/list/List";
import Single from "./pages/single/Single"
import SingleCategory from "./pages/singleCategory/SingleCategory"
import SingleProduct from "./pages/singleProduct/SingleProduct"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { productColumns, userColumns, categoryColumns } from "./datatablesource";
import NewEquipment from "./pages/newEquipment/NewEquipment";
import NewCategory from "./pages/newCategory/NewCategory";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({children})=>{
    const{user} = useContext(AuthContext)
    if(!user){
      return <Navigate to="/login"/>;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
        
            <Route path="/admin-panel" 
              index 
              element={<ProtectedRoute><Home /></ProtectedRoute>} />
            
            <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns} /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />

            </Route>
            <Route path="products">
              <Route index element={<ProtectedRoute><List columns={productColumns}/></ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute><SingleProduct /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewEquipment /></ProtectedRoute>}
              />
            </Route>
            <Route path="categories">
              <Route index element={<ProtectedRoute><List columns={categoryColumns}/></ProtectedRoute>} />
              <Route path=":categoryId" element={<ProtectedRoute><SingleCategory /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewCategory /></ProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
