import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Welcome from './pages/Welcome/Welcome';
import ResLogin from './pages/SignInRes/Login';
import ComLogin from './pages/SignInCom/Login';
import ResearcherReset from './pages/ResearcherReset/Reset';
import CompanyReset from './pages/CompanyReset/Reset';
import LoginWithCode from './pages/LoginWithCode/LoginWithCode';
import {AdminLogin} from './pages/Forms/AdminLogin'
import {WelcomeLogin} from './pages/Forms/WelcomeLogin'
import {RegistrationForm} from './pages/Registration/RegistrationForm'
import ResearcherRegister from './pages/Registration/ResearcherRegister'
import {RegistrationSecondPage} from './pages/Registration/ResearcherRegSecond'
import {RegistrationThirdPage} from './pages/Registration/ResearcherRegThird'
import {RegistrationSubmitPage} from './pages/Registration/ResearcherRegSubmit'
import CompanyRegister from './pages/Registration/CompanyRegister'
import {RegCompanySecondPage} from './pages/Registration/CompanyRegSecond'
import {RegCompanySubmitPage} from './pages/Registration/CompanyRegSubmit'
import CompanyDashboard from './pages/CompanyDashboard/CompanyDashboard'
import Profile from './pages/CompanyDashboard/Rightside/Profile/Profile';
import ResearcherProfile from './pages/ResearcherDashboard/Profile/Profile';
import ResearcherNewPassword from './pages/ResearcherNewPassword/NewPassword';
import CompanyNewPassword from './pages/CompanyNewPassword/NewPassword';
import ResearcherDashboard from './pages/ResearcherDashboard/ResearcherDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ResearchProjects from './pages/ResearchProjects/ResearcherProjects';
import ProjectList from './pages/ResearchProjects/ProjectsList'; 


import ProductDetail from './pages/ProductDetails';
import CrudTable from './pages/CrudTable';
import CrudEdit from './pages/CrudEdit';
import CrudDelete from './pages/CrudDelete';
import CrudDetails from './pages/CrudDetails';
import Product from './pages/productReview/product';
import Messages from './pages/ResearcherDashboard/Messages';
import ProductReview from './pages/Review/ProductReview';
import AddReview from './pages/Review/AddRating';
import ToDo from './pages/ResearcherDashboard/Projects/ToDo';
import ToDos from './pages/CompanyDashboard/Projects/ToDo';
import Table from './Review/Table';
import TableDelete from './Review/TableDelete';
import TableEdit from './Review/TableEdit';
import TableDetails from './Review/TableDetails';
import ReviewAdd from './pages/ResearchProjects/ReviewAdd';
import UserDetail from './pages/CompanyUsers/userDetails';
import UserEdit from './pages/CompanyUsers/userEdit';
import UserDelete from './pages/CompanyUsers/userDelete';

//tested profile
import ProfileScreen from './pages/CompanyDashboard/ProfileScreen';
import AdminProject from './pages/ResearchProjects/AdminProject';
import Notification from './pages/ResearcherDashboard/Notifications/Project';
import Userprofile from './pages/CompanyDashboard/Rightside/Profile/Userprofile';
import UpdateProfile from './pages/CompanyDashboard/Rightside/Profile/UpdateProfile';
import Details from './pages/CompanyDashboard/Rightside/Profile/Details';
import ToDoEdit from './pages/CompanyDashboard/Projects/ToDoEdit';
import Companyuser from './pages/CompanyProfile/companyUser';
import ResearcherUser from './pages/CompanyProfile/companyUser';
import Review from './Review/Table copy';
import ReviewEdit from './Review/TableEdit copy';
import ReviewDelete from './Review/TableDelete copy';
import {useSelector } from "react-redux";
import UserProjectList from './pages/ResearchProjects/UserProjectList'; 
import AddRequest from './pages/CompanyDashboard/ProposalRequest/AddRequest';
import RequestTable from './pages/CompanyDashboard/ProposalRequest/RequestTable';
import RequestEdit from './pages/CompanyDashboard/ProposalRequest/EditRequest';
import DeleteEdit from './pages/CompanyDashboard/ProposalRequest/DeleteRequest';
import ReviewFile from './pages/ResearchProjects/ReviewFile'; 
import './App.css';
import AddMessage from './pages/ResearcherDashboard/Notifications/AddMessage';
import ResearcherMsg from './pages/ResearcherDashboard/Notifications/ResearcherMessage.js';
import CompanyMsg from './pages/CompanyDashboard/ProposalRequest/CompanyMessage.js'
//07/17
import ResearcherActivate from './pages/Registration/researcherActivate';
import CompanyActivate from './pages/Registration/companyActivate';
import AllMessages from './pages/AdminDashboard/components/AllMsg';
//06/25
import { getUserDetails,getResearcherDetails } from "../src/actions/userActions";
import { useEffect } from 'react';
import store from './store';
const App = () => {
  useEffect(() => {
    store.dispatch(getUserDetails())
    store.dispatch(getResearcherDetails)
  })
  return (
    
    <div>
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          
          <Route path="/*" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/Companylogin" element={<ComLogin />} />
          <Route path="/Researcherlogin" element={<ResLogin />} />
          <Route path="/ResearcherforgotPassword" element={<ResearcherReset />} />
          <Route path="/CompanyforgotPassword" element={<CompanyReset />} />
          <Route path="/passwordreset/:token" element={<ResearcherNewPassword />} />
          <Route path="/passwordresetCom/:token" element={<CompanyNewPassword />} />
          <Route path="/accsescode" element={<LoginWithCode />} />
          <Route exact path={"/admin"} element={<AdminLogin/>} />
          <Route exact path={"/registrationform"} element={<RegistrationForm/>} />
          <Route exact path="/ResearcherRegister" element={<ResearcherRegister/>} />
          <Route exact path={"/reg-researcher-secondpage"} element={<RegistrationSecondPage/>} />
          <Route exact path={"/reg-researcher-Thirdpage"} element={<RegistrationThirdPage/>} />
          <Route exact path={"/reg-researcher-submit"} element={<RegistrationSubmitPage/>} />
          <Route exact path="/CompanyRegister" element={<CompanyRegister/>} />
          <Route exact path={"/reg-company-secondpage"} element={<RegCompanySecondPage/>} />
          <Route exact path={"/reg-company-submitpage"} element={<RegCompanySubmitPage/>} />
          
         
          <Route exact path={"/companydashboard"} element={<CompanyDashboard/>} />
          <Route path="/requestTable" element={<RequestTable/>} />
          <Route path="/addRequest" element={<AddRequest/>} />
          <Route path='/Companyreview' element={<Review/>}/>
          <Route path="/message" element={<Messages/>}/>
          

          <Route exact path={"/adminDashboard"} element={<AdminDashboard/>} />
          <Route exact path={"/researcherdashboard"} element={<ResearcherDashboard/>} />
          <Route path="/getCompanyRecord/:_id" element={<Profile/>} />  
          <Route path="/getResearcherRecord/:_id" element={<ResearcherProfile/>} />
           <Route path="/researchProjects/:_id" element={<ResearchProjects/>}/>
          <Route path="/projectsList" element={<ProjectList/>}/>
          <Route path='/adminProject' element={<AdminProject/>}/>
             <Route path="/users" element={<CrudTable/>}/>
             <Route path="/users/:_id" element={<CrudDetails/>}/>
           <Route path="/users/:_id/edit" element={<CrudEdit/>}/>
           <Route path="/userCompany/:_id" element={<UserDetail/>}/>
           <Route path="/userCompany/:_id/edit" element={<UserEdit/>}/>
           <Route path="/users/:_id/delete" element={<CrudDelete/>}/>
           <Route path="/userCompany/:_id/delete" element={<UserDelete/>}/>
           <Route path="/products/:id" element={<ProductDetail/>}/> 
           <Route path="/product/:id" element={<Product/>}/> 
           
           <Route path="/product/reviews/:Id" element={<ProductReview />} />
           <Route path="/product/reviews/:Id" element={<ProductReview />} />
          
           <Route path="/add/:fileId" element={<AddReview/>} />

           <Route path="/todo" element={<ToDo/>}/>
           <Route path="/req/:id/edit" element={<ToDoEdit/>}/>
           <Route path="/req" element={<ToDos/>}/>
           <Route path='/review' element={<Table/>}/>
          
           <Route path="/Companyreview/:_id/delete" element={<ReviewDelete/>}/>
          <Route path="/Companyreview/:_id/edit" element={<ReviewEdit/>}/>
          <Route path="/review/:_id/delete" element={<TableDelete/>}/>
          <Route path="/review/:_id/edit" element={<TableEdit/>}/>
          <Route path="/review/:_id" element={<TableDetails/>}/>
          <Route path="/review/:_id/add" element={<ReviewAdd/>}/>
          <Route path="/review/:_id/add" element={<ReviewAdd/>}/>
          <Route path="/user/profile" element={<Userprofile/>}/>
          <Route path="/update" element={<UpdateProfile/>}/>
          <Route path="/notify" element={<Notification/>}/>
          <Route path="/details" element={<Details/>}/>


          <Route path="/companyuser" element={<Companyuser/>} />
          <Route path="/researcheruser" element={<ResearcherUser/>} />
         
         
          <Route path="/editRequest/:_id" element={<RequestEdit/>} />
          <Route path="/deleteRequest/:_id" element={<DeleteEdit/>} />
         {/*  <Route path="/downloadFile/:_id" element={<UserProjectList/>}/> */}
         <Route path="/uploadedfiles" element={<UserProjectList/>}/>
          <Route path="/reviewFile/:_id" element={<ReviewFile/>}/>
          <Route path="/addresearchMessage/:_id/add/:title" element={<AddMessage/>}/>
          <Route path="/receivedMsgRes" element={<ResearcherMsg/>}/>
          <Route path="/receivedMsgCom" element={<CompanyMsg/>}/>
          //07/17
          <Route path="/users/:id/verify/:token" element={<ResearcherActivate/>} />
          <Route path="/user/:id/verify/:token" element={<CompanyActivate/>} />
          <Route path="/allmsg" element={<AllMessages/>} />
          </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
