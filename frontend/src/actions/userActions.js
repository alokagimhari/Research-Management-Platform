import axios from "axios";
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
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    ADD_FIRST_MESSAGE
  } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";

  export const loginCom = (username, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        
      };
  
      const data = await axios.post(
        "/comlogin",
        { username, password},
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const loginAdmin = (username, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        
      };
  
      const data = await axios.post(
        "/admin",
        { username, password},
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const loginRes = (username, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        
      };
  
      const data = await axios.post(
        "/reslogin",
        { username, password},
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  

  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT }); 
    const navigate=useNavigate();
    navigate("/*")
  };
  
  export const Resregister = ( first_name,
    last_name,
    surname,
    gender,
    birthDay,
    address,
    state,
    country,
    time_zone,
    contact,
    industry,
    institute,
    linkedIn,
    researchGate,
    email,
    username,
    password,
    pic) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        method: "POST",
        headers: {          
          "Content-type": "application/json",
          
        },
      };
  
      const data = await axios.post(
        "/researcherRegister",
        {  first_name,
          last_name,
          surname,
          gender,
          birthDay,
          address,
          state,
          country,
          time_zone,
          contact,
          industry,
          institute,
          linkedIn,
          researchGate,
          email,
          username,
          password,
          pic
        },config
      );
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const Comregister = ( company_name,
    industry,
    business_regNo,
    scale,
    address,
    state,
    country,
    time_zone,
    contact,
    email,
    username,
    password,
    pic) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const config = {
        method: "POST",
        headers: {          
          "Content-type": "application/json",
          
        },
      };
  
      const data = await axios.post(
        "/companyRegister",
        {  company_name,
          industry,
          business_regNo,
          scale,
          address,
          state,
          country,
          time_zone,
          contact,
          email,
          username,
          password,
          pic, 
        },config
      );
  
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
  export const updateProfile = (first_name,last_name,industry,linkedIn) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLoginRes: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const data = await axios.post("/getuserRes", first_name,last_name,industry,linkedIn, config);
  
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  


  export const updateProfileCom = (company_name,email,industry,pic) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLoginCom: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const data = await axios.post("http://localhost:5000/profile", company_name,email,industry,pic, config);
  
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
     dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
export const forgotPasswordRes = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

        const data = await axios.post(
   `/forgotPasswordRes`,
      {
        username,
      },
      config
    );

    dispatch({ type: USER_PASSWORD_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};


export const passwordresetRes = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `http://localhost:5000/passwordresetRes/${token}`,
      {
        password,
      },
      config
    );

    dispatch({ type: USER_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

export const forgotPasswordCom = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

        const { data }= await axios.post(
   `/forgotPasswordCom`,
      {
        username,
      },
      config
    );

    dispatch({ type: USER_PASSWORD_SUCCESS, payload: data });
   
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};


export const passwordresetCom = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `http://localhost:5000/passwordresetCom/${token}`,
      {
        password,
      },
      config
    );

    dispatch({ type: USER_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_PASSWORD_FAIL,
      payload: error.response.data,
    });
  }
};

export const getUserProfileAction=()=>{
  return async (dispatch, getState) =>{
    //grab the user 
 
    try {
      dispatch({
        type : USER_PROFILE_REQUEST,
      });
      const {
        userLoginCom: { userInfo },
      } = getState();
      const config = {
        headers :{
          "Content-Type": "application/json",
          authorization :   `Bearer ${userInfo.token}`
        }
      }

      //make request 
      const data = await axios.get('/profile',config);
      
      dispatch({
        type:USER_PROFILE_SUCCESS,
        payload:data,
      })
    } catch (error) {
      dispatch({
        type:USER_PROFILE_FAIL,
        payload:error.response && error.response.data.message,
      })
    }

  }
}


  export const updateUser = (company_name,email,industry)=>{
    return async (dispatch,getState) =>{
      try{
        dispatch({
          type:USER_UPDATE_REQUEST
        });
        const {userInfo} = getState().userLoginCom;
        const config = {
          headers :{
            "Content-Type": "application/json",
            authorization:`Bearer ${userInfo.token}`
          },
        };
        const {data} = await axios.post('/update',{
          company_name,email,industry
        },config);
        dispatch({
          type:USER_UPDATE_SUCCESS,
          payload:data
        })
      }catch(error){
        dispatch({
          type:USER_UPDATE_FAIL,
          payload:error.response && error.response.data.message,
        })
      }
    }
  }
//2023/05/23
export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userLoginCom: { userInfo },
    } = getState();

    

    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    };
    console.log(userInfo.data.token);
    const data = await axios.get(`http://localhost:5000/company/profile`,config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getResearcherDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userLoginRes: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        Authorization: `Bearer ${userInfo.data.token}`,
      },
    };
    console.log(userInfo.data.token);
    const data = await axios.get(`http://localhost:5000/researcher/profile`,config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      });
      const {
        userLoginCom: { userInfo },
      } = getState();
      const config = {
        headers: {
        
          Authorization: `Bearer ${userInfo.data.token}`,
        },
      };
      const { data } = await axios.put("/profile", user, config);
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const addFirstMessage = (message) => ({
    type: ADD_FIRST_MESSAGE,
    payload: message,
  });


