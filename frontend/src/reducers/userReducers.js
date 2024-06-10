import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_PASSWORD_FAIL,
    USER_PASSWORD_REQUEST,
    USER_PASSWORD_SUCCESS,
    PRODUCTREVIEW_FETCH_START,
    PRODUCTREVIEW_FETCH_SUCCESS,
    PRODUCTREVIEW_FETCH_FAIL,
    CREATE_REVIEW_START,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_RESET,
    PRODUCT_FETCH_FAIL,
    PRODUCT_FETCH_START,
    PRODUCT_FETCH_SUCCESS,
    PRODUCTLIST_FETCH_START,
    PRODUCTLIST_FETCH_SUCCESS,
    PRODUCTLIST_FETCH_ERROR,
    USER_PROFILE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    ADD_FIRST_MESSAGE
  } from "../constants/userConstants";
  
  export const listProducts = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCTLIST_FETCH_START:
        return {
          loading: true,
          products: [],
        };
      case PRODUCTLIST_FETCH_SUCCESS:
        return {
          products: action.payload.results,
          count: action.payload.count,
          success: true,
        };
      case PRODUCTLIST_FETCH_ERROR:
        return {
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  

  export const loginComReducer  = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
}; 
export const loginResReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  }; 

  export const loginAdminReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  }; 


  export const companyRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const researcherRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload, success: true };
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };

  export const forgotPassword = (state = {}, action) => {
    switch (action.type) {
      case USER_PASSWORD_REQUEST:
        return { loading: true };
      case USER_PASSWORD_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_PASSWORD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const productReview = (state = { productReviews: [] }, action) => {
    switch (action.type) {
      case PRODUCTREVIEW_FETCH_START:
        return {
          loading: true,
          productReviews: [],
        };
      case PRODUCTREVIEW_FETCH_SUCCESS:
        return {
          productReviews: action.payload.data,
          count: action.payload.count,
          success: true,
        };
      case PRODUCT_FETCH_FAIL:
        return {
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export const createReview = (state = {}, action) => {
    switch (action.type) {
      case CREATE_REVIEW_START:
        return {
          loading: true,
        };
      case CREATE_REVIEW_SUCCESS:
        return {
          success: true,
        };
      case CREATE_REVIEW_FAIL:
        return {
          error: action.payload,
        };
      case CREATE_REVIEW_RESET:
        return {};
  
      default:
        return state;
    }
  };
  
  export const Product = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_FETCH_START:
        return {
          loading: true,
          product: {},
        };
      case PRODUCT_FETCH_SUCCESS:
        return {
          product: action.payload,
          success: true,
        };
      case PRODUCT_FETCH_FAIL:
        return {
          error: action.payload,
        };
  
      default:
        return state;
    }
  }
   export const UserProfileReducer = (state={},action) =>{
      switch(action.type){
        case USER_PROFILE_REQUEST:
          return{
            loading:true
          }
          case USER_PROFILE_SUCCESS:
            return {
              user : action.payload
            }
            case USER_PROFILE_FAIL:
              return{
                loading:false,
                error:action.payload,
              }
              default:
                return state;
      }
   }

   export const updateUserProfile = (state={auth:true},action)=>{
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return{
          loading:true
        };
        case USER_UPDATE_SUCCESS:
          return{
            user:action.payload,
            success:true
          };
          case USER_UPDATE_FAIL:
        return{
          loading:false,
          error:action.payload
        };
    
      default:
        return state;
    }
   }
//2023/05/23
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export const userResearcherReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false,  userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const initialState = {
  firstMessage: null,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FIRST_MESSAGE":
      return {
        ...state,
        firstMessage: action.payload,
      };
    default:
      return state;
  }
};