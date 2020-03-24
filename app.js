var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://InsaneCliche:Teemo123@cluster0-vya5f.mongodb.net/TodoApp?retryWrites=true&w=majority";

var Todo = require('./models/todo_model');
var User = require('./models/user_model');

//mongoose connection
mongoose.connect(mongoDB, {useNewUrlParser: true});

//Set view engine
app.set("view engine", "ejs");
app.use(bodyParse.urlencoded({extended: true}));

//============= Express Routes ===============//
//Default Route
app.get('/', function(req, res) {
    Todo.find({}, function(err, todoList) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index.ejs", {todoList: todoList});
        }
    });
});

//Submit button route
app.post("/newtodo", function(req, res) {
    console.log("New todo item submitted");
    var newItem = new Todo({
        name: req.body.item
    });

    Todo.create(newItem, function(err, Todo) {
        if(err) {
            console.log(err);
        } else {
            console.log("Inserted Item: " + newItem);
        }

    });
    res.redirect("/");
});

//Catch all other routes
app.get("*", function(req, res) {
    res.send("<h1>Invalid Page</h1>");
});

//Server listening on port 3000
app.listen(3000, function() {
    console.log("Server is now running on port 3000!");
});