import React, { useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { updateUser } from "../../../../actions/userActions";
const UpdateProfile =() =>{
    //pre populate the existing user from our store
    const userLoginCom = useSelector(state=>state.userLoginCom);
    const {userInfo} = userLoginCom;
    
    const dispatch =  useDispatch();
    const [company_name,setCompanyName] = useState(userInfo?.company_name);
    const [email,setEmail] = useState(userInfo?.email);
    const [industry,setIndustry]=useState(userInfo?.industry);

    const UpdateUser = useSelector(state => state.UpdateUser);
    const { user,loading,success,error} = UpdateUser;
    //console.log(userInfo);


    //useDispatch
   
    const handleFormSubmit = e =>{
        e.preventDefault();
        dispatch(updateUser(company_name,email,industry))
    }

    return (
        <div className="row container-height">
            <div className="col-log-6 col-md-6 m-auto">
                <div className="container">
                    {error && <h1>{error}</h1>}
                    {loading && <h1>{loading}</h1>}
                    <h1 className="text-center"> Update</h1>
                        <form onSubmit={handleFormSubmit}>
                            <fieldset>
                                <div className="form-gorup">
                                    <label htmlFor="exampleInputEmail1">Company Name</label>
                                    <input
                                    value={company_name}
                                    onChange={e=>setCompanyName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter Company Name"
                                    />
                                </div>
                                <div className="form-gorup">
                                    <label htmlFor="exampleInputEmail1">Email</label>
                                    <input
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    />
                                </div>
                                <div className="form-gorup">
                                    <label htmlFor="exampleInputEmail1">Industry</label>
                                    <input
                                    value={industry}
                                    onChange={e=>setIndustry(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary m-auto">
                                    Update Your Profile
                                </button>
                            </fieldset>
                        </form>
                </div>
            </div>

        </div>
    );
}
export default UpdateProfile;