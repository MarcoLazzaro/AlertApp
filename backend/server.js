const express = require("express");
const app = express()
const mongoose = require("mongoose")
require("dotenv/config")

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