import express from 'express'
import cors from 'cors'
import { urlencoded, json } from "body-parser"
import { join } from 'path'

import { connect } from "mongoose"
import { url } from "./models/config"
import posts from './routes/posts'
import users from './routes/user'
import profile from './routes/profile'
import homeCenter from './routes/homeCenter'


const app=express();
//app.use(cors())



connect(url,{
    userNewUrlParser:true,
    userCreateIndex:true
})


app.use(urlencoded({extended:true}))
app.use(json())
//allow to access to file , and tha path is for 
// rediraction to right path from "images" to "backend/images" 
app.use("/images",express.static(join("images")))


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

export default app