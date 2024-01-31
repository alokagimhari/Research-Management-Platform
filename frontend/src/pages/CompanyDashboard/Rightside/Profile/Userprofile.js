import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { getUserProfileAction } from "../../../../actions/userActions";
 
const UserProfile=()=>{
   /*  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserProfileAction())
    },[dispatch]);
    const Userprofile =useSelector(state =>state.Userprofile); */
  //  const {error,loading,user} = Userprofile; 

    const { userInfo, loading } = useSelector(state => state.userLoginCom);
    return (
        <>

        {loading? <h3>Loading</h3>:<div className='container'>
        <div className='row'>
          <div className='col mt-5'>
            <div className='card m-auto ' style={{ width: '50%' }}>
             
              <div className='card-body'>
                <h5 className='card-title'>Email :{userInfo.email}</h5>
                <p className='card-text'>Company Name:{userInfo.company_name}</p>
                <Link to='/user-update' className='btn btn-primary'>
                  Update your profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
        </>
    )
}
export default UserProfile;