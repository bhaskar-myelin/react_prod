import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const retrieveStoredToken = () => {
  const storedUser = JSON.parse(localStorage.getItem("persist:root"))?.auth;
  const storedToken = storedUser && JSON.parse(storedUser).token;
  const isAdminState = storedUser && JSON.parse(storedUser).isAdmin;
  const secretKey = process.env.REACT_APP_JWT_SEC;
  if (!storedToken || !isAdminState) {
    // No token or isAdmin state found
    return {
      token: "",
      UserName: null,
      CustomerID: null,
      isAdmin: false,
    };
  }
  if (isAdminState === "true") {
    return { token: storedToken, CustomerID: null, isAdmin: isAdminState };
  } else {
    try {
      const decodedToken = jwtDecode(storedToken, secretKey);
      const { UserName, CustomerID } = decodedToken;
      return {
        token: storedToken,
        UserName: UserName,
        CustomerID: CustomerID,
        isAdmin: isAdminState,
      };
    } catch (err) {
      console.error(err);
    }
  }
};

const tokenData = retrieveStoredToken();
let initialToken;
let initialAdmin;
let initialCusId;
let initialUsername;

if (tokenData) {
  initialToken = tokenData.token;
  initialAdmin = tokenData.isAdmin;
  initialCusId = tokenData.CustomerID;
  initialUsername = tokenData.UserName;
} else {
  initialToken = "";
  initialAdmin = false;
  initialCusId = null;
  initialUsername = "";
}

const initialAuthState = {
  isLoggedIn: false,
  isAdmin: initialAdmin,
  token: initialToken,
  cusId: initialCusId,
  username: initialUsername,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      if (action.payload.admin === true) {
        state.isAdmin = true;
        state.token = "admin";
      } else {
        state.isAdmin = false;
        state.token = action.payload.token;
        state.cusId = action.payload.cusId;
        state.username = action.payload.username;
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = "";
      state.cusId = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
