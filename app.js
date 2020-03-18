var express = require("express");
var app = express();
var bodyParse = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParse.urlencoded({extended: true}));

var todoList = [
    "Wash the car and change oil",
    "Go shopping",
    "Do homework"
]

//============= Express Routes ===============//

//Default Route
app.get('/', function(req, res) {
    res.render("index.ejs", {todoList: todoList});
});

//Submit button route
app.post("/newtodo", function(req, res) {
    console.log("New todo item submitted");
    var item = req.body.item;
    todoList.push(item);
    res.redirect("/");
})

//Catch all other routes
app.get("*", function(req, res) {
    res.send("<h1>Invalid Page</h1>");
});



//Server listening on port 3000
app.listen(3000, function() {
    console.log("Server is now running on port 3000!");
});
