const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");

//using route to stroe data in database of curses
const Coursesdata = require("./src/models/coursesdata");
const gptscript = require("./src/models/chatgpt"); 

const collection = require("./src/mongodb");

const app = express();     
const port = process.env.PORT || 3000;    

//static pages
const staticpath = path.join(__dirname, "./public");
app.use(express.static(staticpath));    
     
//find path and use setup
const templetepath = path.join(__dirname, "./templetes/views");
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templetepath);
app.use(express.urlencoded({ extended: false }));

//seting hbs parsals
hbs.registerPartials("templetes/partials");
//resorce locatopn assies
app.use("/static", express.static("public"));

//routes for static page
//routing
app.get("/", (req, res) => {
  res.render("index");
  // res.send("hello index.html page");
});

app.get("/about", (req, res) => {
  res.render("about");
  // res.send("hello about.html page");
});

//file share from templete folder
// app.get("*",(req,res)=>{
//    res.render(index);
// })

app.get("/loginme", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    conformpassword: req.body.conformpassword,   
  };

  await collection.insertMany([data]);
  const details = await gptscript.findOne({ _id: "65193ea4785aea683fa9af43" });
  res.render("home", {
    details: details,
  });
});

app.post("/login", async (req, res) => { 
  try {
    const check = await collection.findOne({ email: req.body.email });
    if (check.password === req.body.password) {
      const details = await gptscript.findOne({
        _id: "65193ea4785aea683fa9af43",
      });
      //console.log(detai);
      res.render("home", {
        details: details,
      });
    } else {
      res.render("error");
    }
  } catch {
    res.render("error");
  }
});

// app.get("/chatgptme",(req,res)=>{
//   res.render("gptindex")
// })

app.get("/home", async (req, res) => {
  const details = await gptscript.findOne({ _id: "65193ea4785aea683fa9af43" });
  //console.log(detai);
  res.render("home", {
    details: details,
  });
});

app.get("/aboutteam", (req, res) => {
  res.render("aboutteam");
});

app.get("/coursesteam", async (req, res) => {
  const details = await Coursesdata.findOne({
    _id: "650ee6cc0135d07261b4642a",
  });
  // console.log(details);
  res.render("coursesteam", {
    details: details, 
  });
});
app.get("/contactteam", (req, res) => {
  res.render("contactteam");
});
app.get("/foryou", (req, res) => {
  res.render("foryou");
});

//server create
app.listen(port, () => {
  console.log(`server is running on port at ${port}`);
});
 