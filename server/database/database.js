const mongoose = require("mongoose")
// const User = require("../model/userModel")
const adminSeeder = require("../adminSeeder")


exports.connectDatabase = async(URI)=>{
    // connecting to database 

mongoose.connect(URI)

adminSeeder()




}