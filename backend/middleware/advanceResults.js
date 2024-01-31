const advanceResults = (model, populate) => async (req, res, next) => {
    //JSON.Stringify Convert the javascript object into string | when sending data to server, the data has to be string
    //JSON.parse Convert the string into javascript Object | when server send data, data is always a string, so parse the data to convert into js Object
  
    let query;
  
    const reqQuery = { ...req.query };
  
    //Feild to exclude
  
    const removeFeilds = ["select", "sort", "limit", "page"];
  
    removeFeilds.forEach((param) => delete reqQuery[param]);
  
    //Create query string
    let queryStr = JSON.stringify(reqQuery);
  
    //Create operators ($gt,gte,lt,lte)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)/g, (match) => `$${match}`);
  
    //Finding resource
    query = model.find(JSON.parse(queryStr));
  
    //Select
    if (req.query.select) {
      const select = req.query.select.split(",").join(" ");
      query = query.select(select);
    }
  
    //Sort
    if (req.query.sort) {
      const sort = req.query.sort.split(",").join(" ");
      query = query.sort(sort);
    } else {
      query = query.sort("-createdAt");
    }
  
  
    if (populate) {
      query = query.populate(populate);
    }
 
    const results = await query;
  
    res.advanceResults = {
      status: "success",
      count: results.length,
      results: results,
    };
    next();
  };
  
  module.exports = advanceResults;