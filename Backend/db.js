require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const dbConnect = async () =>{
 await mongoose.connect(mongoURI);
 console.log("connected successfully")
}


module.exports = dbConnect;

