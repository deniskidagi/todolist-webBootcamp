const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")


const items = []
const workItems = []
const app = express()
app.set("view engine", "ejs")

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    let day = date()
    res.render("list", {listTitle: day, newItems: items})
})
app.post("/", function(req, res){
    let item = req.body.item
    if(req.body.list === "work"){
        workItems.push(item)
        res.redirect("/work")
    } else {
        items.push(item)
        res.redirect("/")
    }
   
})
app.get("/work", function(req, res){
    res.render("list", {listTitle:"work", newItems: workItems})
})

app.listen(3000, function(){
    console.log("server lisstening on port 3000");
})