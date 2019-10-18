const mongoose= require("mongoose")
const db =require("./config");
console.log("process.env.MONGOOSE_URL",process.env.MONGOOSE_URL)
mongoose.connect(db.url)

module.exports=mongoose;