const mongoose=require("mongoose")
const Coursesdata=require("./models/coursesdata");
const gptscript=require("./models/chatgpt");
//connetion with mongoose
const uri='mongodb+srv://studentreg:yuymVYVTMw94oJCy@cluster1.ahhbx3y.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{ 
    console.log("connection successfull to the mongodb atlas");
    // Coursesdata.create({
    //         links:[ 
    //         {
    //            courseimgurl:"/static/imagescourse/se.png",
    //            coursename:"JAVA",
    //            coursedetail:"programming language",
    //            url:"www.google.com/apple"
    //         }
    //     ]
    // })

    // gptscript.create({
    //     links:"www.google.com"
    // })



}).catch(()=>{
    console.log("not connect");
})

const loginSchema=new mongoose.Schema({
    // name:{
    //     type:String,
    //     required:true
    // },
    // password:{
    //     type:String,
    //     required:true
    // },

    email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true
    },
     firstname:{
        type:String,
        required:true
    },

    lastname:{
        type:String,
        required:true
    }

   
})

// const collection=new mongoose.model("loginCollection",loginSchema)
const collection =new mongoose.model("loginCollection", loginSchema);


module.exports=collection