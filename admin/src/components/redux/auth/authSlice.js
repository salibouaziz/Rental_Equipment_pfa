import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';
import {toast} from "react-toastify";

const initialState = {
  isLoggedIn:false,
  user:null,
  isError:false,
  isSuccess:false,
  isLoading:false,
  message:"",
}

//Logout User
export const logout = createAsyncThunk(
  //name_of_state/name_of_function
  "auth/logout",
  //initialize the function that will make a request to the backend
  async (_,thunkAPI) =>{//_ : means we will not send any data 
    try {
      return await authService.logout();
    } catch (error) {
      //all the possible ways an API can return an error
      const message = 
      (error.response &&
        error.response.data &&
        error.response.data.message)||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //create a reducer function that will reset my auth back to the default
    RESET_AUTH(state){
        state.isLoggedIn = false;
        state.user = null;
      state.isError=false;
      state.isSuccess=false;
      state.isLoading=false;
      state.message="";
    },
  },
  //we recieve the response from the database
   extraReducers:(builder)=>{
    builder
   
    
    //Logout User
    .addCase(logout.pending,(state) =>{
      state.isLoading=true;
    })
    .addCase(logout.fulfilled,(state,action) =>{
      state.isLoading=false;
      state.isSuccess=true;
      state.isLoggedIn=false;
      state.user = null;
      //throw a notification to the frontend that the login was successful
      dispatch(RESET_AUTH());
      toast.success(action.payload, {
        position: "bottom-left"
      });
    })
    .addCase(logout.rejected,(state,action) =>{//the Http request was rejected
      state.isLoading=false;
      state.isError=true;
      state.message=action.payload;//action.payload is the message we get from the server
      state.user = null;
      //throw a notification to the frontend that there is an error in the login 
      toast.error(action.payload, {
        position: "bottom-left"
      });
    })
    //getLoginStatus
    
    
    
  }
});

export const {RESET_AUTH} = authSlice.actions;
export default authSlice.reducer;