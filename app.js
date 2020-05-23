var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://InsaneCliche:Teemo123@cluster0-vya5f.mongodb.net/TodoApp?retryWrites=true&w=majority";

var Todo = require('./models/todo_model');
var User = require('./models/user_model');

// PORT
const port = process.env.PORT || 3000;

//mongoose connection
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true});

//Set view engine
app.set("view engine", "ejs");
app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

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

//Submit button routes
app.post("/newtodo", function(req, res) {
    console.log("New todo item submitted");

    var newItem = new Todo({
        name: req.body.item,
        done: false
    });
    
    //Add a new todo item to the list.
    Todo.create(newItem, function(err, Todo) {
        if(err) {
            console.log(err);
        } else {
            console.log("Inserted Item: " + newItem);
        }

    });
    res.redirect("/");
});

app.post("/CompleteItem", function(req, res) {
    let checkedValue = req.body.check;
    console.log(checkedValue);
    Todo.findOne({name: checkedValue}, function(err, doc) {
        if(!doc) {
            console.log("An error has occured");
        }
         else {
             if(doc.done == true) {
                 console.log("This item is already completed");
             } else {
                doc.done = true;
                doc.save(function(err) {
                    if(!err) {
                        console.log(doc.name);
                    }
                    else {
                        console.log("error, could not save document");
                    }
                })
             }
            
        }
        res.redirect("/");
    });
   // console.log(Todo.find({name: checkedValue[0]}));
    console.log("Item Completed by user");

    //res.send(newpost.name);

});

//Catch all other routes
app.get("*", function(req, res) {
    res.send("<h1>Invalid Page</h1>");
});


//Server listening on port 3000
app.listen(port, function() {
    console.log(`Server is now running on port ${port}!`);
});