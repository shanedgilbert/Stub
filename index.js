//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const ejs = require("ejs");

const app = express();

mongoose.connect("mongodb/localhost:3000/todolistDB");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeHeader="HOME";
const listsHeader="LISTS";
const settingsHeader="SETTINGS";

app.get("/", function(req, res){
   res.render("home", {titleHeader:homeHeader});
});

app.get("/lists", function(req, res){
   res.render("lists", {titleHeader:listsHeader});
});

app.get("/settings", function(req, res){
   res.render("settings", {titleHeader:settingsHeader});
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
