const Request =  require("../models/Request");
const { isValidObjectId } = require("mongoose");
const { response } = require("express");
const Company = require("../models/companyModel");


const addRequest = async (req, res) => {
    
    const { title,text,deadline,user} = req.body;
 
    /* if (!isValidObjectId(companyId)) return res.json({ error: "Invalid userID!" }); */
  
    //const user = await Company.findOne({ _id: companyId });
    const exisitingUser = await Company.findById(user);
    if (!exisitingUser) return res.json({ error: "user Not Found!" });

    // Create Request
    const newRequest = new Request({
      user,
      title,
      text,
      deadline
    });
  
    exisitingUser.requests.push(newRequest._id);
    await exisitingUser.save();
    await newRequest.save();
  
  
    res.json( {success: true, message: "Thank You For Submitting Your Proposal 🙂" });
  };

  const updateRequest = async (req, res) => {
   
    try {
      const { requestId } = req.params;
    const { title,text,deadline } = req.body;
      const request = await Request.findByIdAndUpdate(
        requestId,
        { ...req.body },
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Request Updated 👍🏻!",
        request,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Updating Blog",
        error,
      });
    }
  };

  

  const removerequest = async (req, res) => {
    try {
      const { requestId } = req.params;
    const request = await Request.findByIdAndDelete(requestId);
        // .findOneAndDelete(req.params.id)
        /* .findByIdAndDelete(requestId)
        .populate("user");
      await request.user.requests.pull(request);
      await request.user.save();
      return res.status(200).send({
        success: true,
        message: "request Deleted!", */
        if (!request) {
          return res.status(404).send({
            success: false,
            message: "Request not found!",
          });
        }
    
        return res.status(200).send({
          success: true,
          message: "Request Deleted!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Erorr WHile Deleteing BLog",
        error,
      });
    }
  };


  const getrequestById = async (req, res) => {
    const { requestId } = req.params;
    
    if (!isValidObjectId(requestId))
      return res.json({ error: "Invalid file Id!" });
  
    const request = await Request.findById(requestId)
  
   res.status(200).send({success:true,request});
  };


  const getrequestByCompanyId = async(req,res)=>{
    
      try {
        const {companyId} = req.params;

    if(!isValidObjectId(companyId))
      return res.json({ error: "Invalid file Id!" })
        const Userrequest= await Company.findById(companyId).populate("requests",'title text deadline');
        
    
        if (!Userrequest) {
          return res.status(404).send({
            success: false,
            message: "Request not found with this id",
          });
        }
        return res.status(200).send({
          success: true,
          message: "user Request",
          Userrequest,
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send({
          success: false,
          message: "error in user blog",
          error,
        });
  }
}

   //// GET ALL REVIEWS
   const getAllRequest = async(req, res) => {
    Request.find()
        .then(request => {
            res.send(request);
        }).catch(err => {
            res.status(500).send({
                message: err.message ||
                   "Some error occurred while retrieving request."
            });
        });
      }

      module.exports={
        addRequest,
        removerequest,
        getAllRequest,
        getrequestById,
        updateRequest,
        getrequestByCompanyId
      }