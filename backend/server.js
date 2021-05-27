const express = require("express");
const app = express();
var cors = require('cors');
const mongoose = require("mongoose")
const bodyParse = require("body-parser")
const routesHandler = require("./routes/routes.js");
const bodyParser = require("body-parser");
require("dotenv/config")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', routesHandler);

/*
// Add headers for the " No 'Access-Control-Allow-Origin' header is present on the requested resource." error
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
*/


 mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
 .then( () =>{
   console.log("DB conneted!");
 })
 .catch( (err) =>{
   console.log(err)
 });

 const PORT = process.env.PORT || 4000;
 app.listen(PORT, () => {
     console.log('Server is up and running on port ' + PORT +'!');
 })