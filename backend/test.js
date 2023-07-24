const mongoose = require('mongoose');

// Schema

const userSchema = new mongoose.Schema({
    firstName : String,
})

const User = mongoose.model("user", userSchema);

// Connection 

mongoose.connect('mongodb://127.0.0.1:27017/employees')
.then(() => {console.log('MongoDb connected')})
.catch((err)=>{console.log(`mongo error ${err}`)});

// This file shows the direct connection of mongoose to MongoDB (*Very IMP)