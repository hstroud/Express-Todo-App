var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Mongoose schema
var todoSchema = new mongoose.Schema({
    name: String,
    done: Boolean
});


module.exports = mongoose.model("Todo", todoSchema);