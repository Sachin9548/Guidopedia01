const mongoose=require("mongoose");
const gptscript=mongoose.Schema({
   links:String
}); 
module.exports=mongoose.model("gptdetail",gptscript)