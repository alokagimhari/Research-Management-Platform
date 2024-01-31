import { createStore,combineReducers, applyMiddleware } from "redux";

import {configureStore,getDefaultMiddleware} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginResReducer,
  loginComReducer,
  loginAdminReducer,
  companyRegisterReducer,
  researcherRegisterReducer,
    userUpdateReducer,
    forgotPassword,
    productReview,
    createReview,
    Product,
    UserProfileReducer,
    updateUserProfile,
    userDetailsReducer,
    userResearcherReducer,
    userUpdateProfileReducer,
    messageReducer
  } from "./reducers/userReducers";


  const reducers = combineReducers({
    userLoginCom : loginComReducer,
    userLoginRes:loginResReducer,
    companyRegiser: companyRegisterReducer,
    ResearcherRegister:researcherRegisterReducer,
    userUpdate: userUpdateReducer,
    userForgotPassword:forgotPassword,
    productReview:productReview,
    createReview:createReview,
    Product:Product,
    userAdmin:loginAdminReducer,
    Userprofile : UserProfileReducer,
    UpdateUser : updateUserProfile,
    userDetails: userDetailsReducer,
    userResearcher:userResearcherReducer,
  userUpdateProfile: userUpdateProfileReducer,
  messageReducer:messageReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLoginCom: { userInfo: userInfoFromStorage },
  userLoginRes: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer:reducers,
  initialState,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: false
    }).concat(middleware),
 
  });
  /* const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  ); */

export default store;