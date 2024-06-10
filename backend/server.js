const express = require ("express");
require("dotenv").config();
const path = require ("path");
const connectDB = require ("./config/db.js");
const cors = require ("cors");
const userRoutes = require( "./controllers/userController.js");
const fileRoutes =  require("./controllers/fileController.js");
const profile = require('./routes/profile.js');
//const requestRoutes = require("./controllers/RequestController.js");
const errorHandler  = require("./middleware/errorMiddleware.js");
const notFound =  require("./middleware/errorMiddleware.js");
const bodyParser = require("body-parser");
const reviewRouter = require("./routes/Reviews");
const productRouter = require("./routes/product");
const requestRoutes = require("./routes/request.js");
const companyProfile = require("./routes/companyProfile.js");
const researcherProfile = require("./routes/ResearcherProfile.js");
const message = require("./routes/message.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const ResearcherMiddleware = require("./middleware/ResearcherMiddleware.js");
connectDB();

const app = express();


app.use(express.json());
app.use(cors({ origin: true, credentials: true }))
 // to accept json data
 const urlencodedParser = bodyParser.urlencoded({ extended: true })
 app.use(bodyParser.json(), urlencodedParser)
 app.use(express.urlencoded({extended: true}));

// --------------------------deployment------------------------------
//const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
}

app.use("/", userRoutes);
app.use("/api/request", requestRoutes);
//app.use("/api/review", reviewRouter);
app.use("/review", reviewRouter);
app.use("/api/product",productRouter);
app.use("/company/",companyProfile);
app.use("/researcher/",researcherProfile);
app.use("/file",fileRoutes);
app.use("/message",message);
// Error Handling middlewares

app.use(errorHandler);
app.use(notFound);
app.use(authMiddleware);
app.use(ResearcherMiddleware);



const PORT = process.env.PORT || 5000;


app.listen(
      PORT,
      console.log(
        `Server running in  mode on port ${PORT}..`.yellow
          .bold
      )
    );
    
  