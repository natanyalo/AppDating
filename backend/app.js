const express= require('express')
const cors = require('cors')
const bodyParser=require("body-parser")
const path =require('path')

const mongoose= require("mongoose")
const db =require("./models/config");
const posts= require('./routes/posts');
const users= require('./routes/user');
const profile= require('./routes/profile')
const homeCenter=require('./routes/homeCenter')


const app=express();
//app.use(cors())



mongoose.connect(db.url,{
    userNewUrlParser:true,
    userCreateIndex:true
})


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//allow to access to file , and tha path is for 
// rediraction to right path from "images" to "backend/images" 
app.use("/images",express.static(path.join("images")))


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE,PUT, OPTIONS"
    );
    next();
  });

app.use("/api/post",posts)
app.use("/api/center",homeCenter)
app.use("/api/user",users)
app.use("/api/profile",profile)

module.exports=app