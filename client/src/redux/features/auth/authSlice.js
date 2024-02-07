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
//Register the User
export const register = createAsyncThunk(
  //name_of_state/name_of_function
  "auth/register",
  //initialize the function that will make a request to the backend
  async (userData,thunkAPI) =>{
    try {
      return await authService.register(userData);
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
//Login User
export const login = createAsyncThunk(
  //name_of_state/name_of_function
  "auth/login",
  //initialize the function that will make a request to the backend
  async (userData,thunkAPI) =>{
    try {
      return await authService.login(userData);
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
//getLoginStatus
export const getLoginStatus = createAsyncThunk(
  //name_of_state/name_of_function
  "auth/getLoginStatus",
  //initialize the function that will make a request to the backend
  async (_,thunkAPI) =>{//_ : means we will not send any data 
    try {
      return await authService.getLoginStatus();
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
      state.isError=false;
      state.isSuccess=false;
      state.isLoading=false;
      state.message="";
    },
  },
  //we recieve the response from the database
   extraReducers:(builder)=>{
    builder
    //Register User
    .addCase(register.pending,(state) =>{
      state.isLoading=true;
    })//the HTTP request is still pending 
    //means we've not gotten a response from the server
    .addCase(register.fulfilled,(state,action) =>{//the Http request was successful we got the right response from the server
      state.isLoading=false;
      state.isSuccess=true;
      state.isLoggedIn=true;
      state.user = action.payload;
      //throw a notification to the frontend that the registration was successful
      toast.success("registration successful", {
        position: "bottom-left"
      });
    })
    .addCase(register.rejected,(state,action) =>{//the Http request was rejected
      state.isLoading=false;
      state.isError=true;
      state.message=action.payload;//action.payload is the message we get from the server
      state.user = null;
      //throw a notification to the frontend that there is an error in the registration 
      toast.error(action.payload, {
        position: "bottom-left"
      });
    })
    //Login User
    .addCase(login.pending,(state) =>{
      state.isLoading=true;
    })
    .addCase(login.fulfilled,(state,action) =>{
      state.isLoading=false;
      state.isSuccess=true;
      state.isLoggedIn=true;
      state.user = action.payload;
      //throw a notification to the frontend that the login was successful
      toast.success("login successful", {
        position: "bottom-left"
      });
    })
    .addCase(login.rejected,(state,action) =>{//the Http request was rejected
      state.isLoading=false;
      state.isError=true;
      state.message=action.payload;//action.payload is the message we get from the server
      state.user = null;
      //throw a notification to the frontend that there is an error in the login 
      toast.error(action.payload, {
        position: "bottom-left"
      });
    })
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
    .addCase(getLoginStatus.pending,(state) =>{
      state.isLoading=true;
    })
    .addCase(getLoginStatus.fulfilled,(state,action) =>{
      state.isLoading=false;
      state.isSuccess=true;
      state.isLoggedIn=action.payload;
      if(action.payload.message === "invalid signature"){
        state.isLoggedIn=false;
      }
    })
    .addCase(getLoginStatus.rejected,(state,action) =>{//the Http request was rejected
      state.isLoading=false;
      state.isError=true;
      state.message=action.payload;//action.payload is the message we get from the server
    })
    
    
  }
});

export const {RESET_AUTH} = authSlice.actions;
export default authSlice.reducer;