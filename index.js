//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://scottsak:Feb!2193803@cluster0.w3za4.mongodb.net/Stub");

const itemsSchema = {
  name:String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Favorites"
});

const homeHeader="HOME";
const listsHeader="LISTS";
const settingsHeader="SETTINGS";

app.get("/", function(req, res){
   res.render("home", {titleHeader:homeHeader});
});

app.get("/lists", function(req, res){
  Item.find({}, function(err, foundItems){
    if(foundItems.length === 0){
      Item.create(item1, function(err){
        if(err){
          console.log(err);
        }
          else{
            console.log("Successfully saved default items to DB");
        }
      });
      res.redirect("/lists");
      }

    else{
      res.render("lists", {titleHeader:listsHeader, newListItems:foundItems});
    }
  });
});

app.post("/delete", function(req,res){
  const checkItemId = req.body.checkbox;


    Item.findByIdAndRemove(checkItemId, function(err){
      if(!err){
          console.log("Successfully deleted item from DB");
      }
    });
    res.redirect("/lists");



});

app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const newItem = new Item({
    name: itemName
  });

  newItem.save();
  res.redirect("/lists");


});

app.get("/settings", function(req, res){
   res.render("settings", {titleHeader:settingsHeader});
});

let port= process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(3000, function() {
  console.log("Server started Successfully");
});
