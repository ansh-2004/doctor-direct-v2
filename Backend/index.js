const express = require("express");
const dbconnect = require("./config/database");
const cors = require("cors");
const app = express();
const cookiesParser = require("cookie-parser");

const cloudinary = require('cloudinary').v2;


const path = require("path");


require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});



app.use(
  "/",
  express.static(path.join(__dirname, "../frontend/build"))
);

app.use((req, res, next) => {
  
   res.setHeader("Access-Control-Allow-Origin", "https://doctordirectproject.netlify.app/");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
 
     //origin: "http://localhost:3000",
     origin: "https://doctordirectproject.netlify.app",
    
  })
);

require("dotenv").config();
app.use(express.json()); // to parse json data from requests
app.use(cookiesParser()); // to parse cookies from request
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is listening at port no ${port}`);
});

dbconnect();

// adding routes to requests from frontend
const routes = require("./routes/route");

// mounting the route.
app.use("/hc", routes);
