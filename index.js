const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const MethodOverride = require("method-override");

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(MethodOverride("_method"));



main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Whatsapp");
  console.log("Connected to MongoDB");
}

//Index Route
app.get("/chats",async(req,res)=> {
  let chats= await Chat.find();
  res.render("index.ejs",{"chats": chats});
});

//New Route
app.get("/chats/new",(req,res)=> {
  res.render("new.ejs");
});

app.post("/chats",(req,res)=> {
  let{from,to,msg}=req.body;
  let newChat=new Chat({
      from:from,
      to:to,
      message:msg,
      created_at: new Date(),
  })
  newChat
  .save()
  .then((res)=> {
    console.log("Chat was saved successfully");
    })

    .catch((err)=> {
      console.log(err.message);
    });

  res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async(req, res)=> {

  let {id}=req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", {chat});
});


//Update Route
app.put("/chats/:id",async(req, res)=> {
  let {id}=req.params;
  let {msg:newMsg}=req.body;
  let UpdatedChat= await Chat.findByIdAndUpdate(id,
    {message:newMsg},
    {runValidators:true ,new:true}
    );
    res.redirect("/chats");
});

//destroy route
app.delete("/chats/:id", async(req, res)=> {
     let {id}=req.params;
     let chatdeleted=await Chat.findByIdAndDelete(id);
      res.redirect("/chats");
});


app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
