const express = require("express");
const app = express()
const mongoose = require("mongoose")
const bodyParse = require("body-parser")
const routesHandler = require("./routes/routes.js");
const bodyParser = require("body-parser");
require("dotenv/config")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);


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