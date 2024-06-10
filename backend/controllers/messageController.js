const Message =  require("../models/Message");
const { isValidObjectId } = require("mongoose");
const { response } = require("express");
const Company = require("../models/companyModel");
const Researcher = require("../models/researcherModel");

const removeMessage=async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });
  
    const idExist = await Message.findById(id);
    if (!idExist) {
      return res.status(404).json({ message: "No message found" });
    }
    try {
      await Message.deleteOne({ _id: id });
      res.status(200).json({ id });
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  };

  
/* const addMessagebyCompany = async (req, res) => {
    const { title, body,companyId,researcherId } = req.body;
  
    try {
        const user = await Company.findById(companyId);
        if (!user) return res.json({ error: "user Not Found!" });

        const newMessage = { title, body, companyId,researcherId };
        const createdMessage = await Message.create(newMessage);
        user.messages.push(newMessage._id);
     
      await user.save();
      const researcher = await Researcher.findById(researcherId);
    if (!researcher) return res.json({ error: "Researcher Not Found!" });

    // Push the created message's _id into the company.messages array
    researcher.messages.push(createdMessage._id);

    // Save the updated company document
    await researcher.save();
      
      res.status(201).json(newMessage);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  }; */
  const addMessagebyCompany = async (req, res) => {
    const { title, body, companyId, researcherId } = req.body;
  
    try {
      const company = await Company.findById(companyId);
      if (!company) return res.json({ error: "Company Not Found!" });
  
      const researcher = await Researcher.findById(researcherId);
      if (!researcher) return res.json({ error: "Researcher Not Found!" });
  
      // Create the new message with appropriate sender and receiver fields
      const newMessage = new Message({
        title,
        body,
        companyId: company._id,
        researcherId: researcher._id,
        isSenderCompany: true,
        isSenderResearcher:false
      });
  
      // Save the new message
      const createdMessage = await newMessage.save();
  
      // Push the created message's _id into the company.messages array
      company.messages.push(createdMessage._id);
      await company.save();
  
      // Push the created message's _id into the researcher.messages array
      researcher.messages.push(createdMessage._id);
      await researcher.save();
  
      res.status(201).json(createdMessage);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  };
  
  const addMessagebyResearcher = async (req, res) => {
    const { title, body, companyId, researcherId } = req.body;
  
    try {
      const researcher = await Researcher.findById(researcherId);
      if (!researcher) return res.json({ error: "Researcher Not Found!" });
      
      const company = await Company.findById(companyId);
      if (!company) return res.json({ error: "Company Not Found!" });
  
     
  
      // Create the new message with appropriate sender and receiver fields
      const newMessage = new Message({
        title,
        body,
        companyId: company._id,
        researcherId: researcher._id,
        isSenderCompany: false,
        isSenderResearcher:true
      });
  
      // Save the new message
      const createdMessage = await newMessage.save();
  
      // Push the created message's _id into the company.messages array
      company.messages.push(createdMessage._id);
      await company.save();
  
      // Push the created message's _id into the researcher.messages array
      researcher.messages.push(createdMessage._id);
      await researcher.save();
  
      res.status(201).json(createdMessage);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  };




  /* const addMessagebyResearcher = async (req, res) => {
    const { title, body,researcherId,companyId } = req.body;
  
    try {
        const user = await Researcher.findById(researcherId);
        if (!user) return res.json({ error: "user Not Found!" });

        const newMessage = { title, body, companyId,researcherId };
        const createdMessage = await Message.create(newMessage);
        user.messages.push(createdMessage._id);
        await user.save();
        const company = await Company.findById(companyId);
    if (!company) return res.json({ error: "Company Not Found!" });

    // Push the created message's _id into the company.messages array
    company.messages.push(createdMessage._id);

    // Save the updated company document
    await company.save();
      
      res.status(201).json(newMessage);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  };
 */
/*   const getMessagesByCompanyId = async(req,res)=>{
    
    try {
      const {companyId} = req.params;

  if(!isValidObjectId(companyId))
    return res.json({ error: "Invalid file Id!" })
    const Userrequest = await Company.findById(companyId).populate('messages','title body researcherId');
      
  
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
}} */
const getMessagesByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!isValidObjectId(companyId))
      return res.json({ error: "Invalid file Id!" });

    const company = await Company.findById(companyId).populate('messages');

    if (!company) {
      return res.status(404).send({
        success: false,
        message: "Company not found with this id",
      });
    }

    // Filter messages to get only those where isSender is true
    const senderMessages = company.messages.filter((message) => message.isSenderCompany === false);

    return res.status(200).send({
      success: true,
      message: "Messages for the company (sender)",
      messages: senderMessages,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in getting messages for the company (sender)",
      error,
    });
  }
};

const AddedMessagesByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!isValidObjectId(companyId))
      return res.json({ error: "Invalid file Id!" });

    const company = await Company.findById(companyId).populate('messages');

    if (!company) {
      return res.status(404).send({
        success: false,
        message: "Company not found with this id",
      });
    }

    // Filter messages to get only those where isSender is true
    const senderMessages = company.messages.filter((message) => message.isSenderCompany === true);

    return res.status(200).send({
      success: true,
      message: "Messages for the company (sender)",
      messages: senderMessages,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in getting messages for the company (sender)",
      error,
    });
  }
}; 

/* const getsendMessagesByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!isValidObjectId(companyId))
      return res.json({ error: "Invalid file Id!" });

    const company = await Company.findById(companyId).populate('messages');

    if (!company) {
      return res.status(404).send({
        success: false,
        message: "Company not found with this id",
      });
    }

    // Filter messages to get only those where isSender is true
    const senderMessages = company.messages.filter((message) => message.isSenderCompany === true);

    // Create an object to store the replies for each message ID
    const replies = {};

    // Loop through the senderMessages array to extract the replies
    for (const message of senderMessages) {
      // Find the reply message for the current message ID
      const reply = company.messages.find((msg) => msg.isSenderResearcher === true && msg.researcherId.toString() === message.researcherId.toString());
      
      // If a reply is found, add it to the replies object with the message ID as the key
      if (reply) {
        replies[message._id] = reply.body;
      }
    }

    return res.status(200).send({
      success: true,
      message: "Messages for the company (sender) with replies",
      messages: senderMessages,
      replies: replies,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in getting messages for the company (sender)",
      error,
    });
  }
}; */

const getMessagesByResearcherId = async (req, res) => {
  try {
    const { researcherId } = req.params;

    if (!isValidObjectId(researcherId))
      return res.json({ error: "Invalid file Id!" });

    const researcher = await Researcher.findById(researcherId).populate('messages');

    if (!researcher) {
      return res.status(404).send({
        success: false,
        message: "researcher not found with this id",
      });
    }

    // Filter messages to get only those where isSender is true
    const senderMessages = researcher.messages.filter((message) => message.isSenderResearcher === false);

    return res.status(200).send({
      success: true,
      message: "Messages for the company (sender)",
      messages: senderMessages,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in getting messages for the company (sender)",
      error,
    });
  }
};

const markMessageAsRead = async (req, res) => {
  const { messageId } = req.params;
  const { isRead } = req.body;

  try {
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ error: "Message not found" });

    // Update the isRead field based on the request body
    message.isRead = isRead;
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getAllMessages = async(req, res) => {
  Message.find()
      .then(reviews => {
          res.send(reviews);
      }).catch(err => {
          res.status(500).send({
              message: err.message ||
                 "Some error occurred while retrieving users."
          });
      });
    };


/* const getMessagesByResearcherId = async(req,res)=>{
    
    try {
      const {reseacherId} = req.params;

  if(!isValidObjectId(reseacherId))
    return res.json({ error: "Invalid file Id!" })
      const Userrequest= await Researcher.findById(reseacherId).populate("messages");
      
  
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
    }} */
    module.exports={removeMessage,addMessagebyCompany,addMessagebyResearcher,getMessagesByCompanyId,getMessagesByResearcherId,markMessageAsRead,AddedMessagesByCompanyId,getAllMessages}