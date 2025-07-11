const mongoose=require("mongoose");
const Coursesdata=mongoose.Schema({
    links:[
        {
            courseimgurl:String,
            coursename:String,
            coursedetail:String,
            url:String   
        },
    ],
});
module.exports=mongoose.model("coursedetail",Coursesdata)