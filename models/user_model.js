var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Mongoose schema
var userSchema = new mongoose.Schema({
    emailAdress: String,
    userName: String,
    password: String
});


module.exports = mongoose.model("User", userSchema);