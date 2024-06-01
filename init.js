const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

let allChats=[
    {
    from: "Vinayak Patil",
    to: "5 Stars",
    message: "Good night bhavano",
    created_at: new Date(),
  },

  {
    from: "Vinayak Patil",
    to: "5 Stars",
    message: "Good night bhavano",
    created_at: new Date(),
  },

  {
    from: "Vinayak Patil",
    to: "5 Stars",
    message: "Good night bhavano",
    created_at: new Date(),
  },
  {
    from: "Vinayak Patil",
    to: "5 Stars",
    message: "Good night bhavano",
    created_at: new Date(),
  }
];



Chat.insertMany(allChats);
  
  