// require express so we can make our app
const express = require('express')
// create our app
const app = express()
// allows us to access dotenv and retrieve values from .env file 
const dotenv = require('dotenv')
dotenv.config()
// require method-override
const methodOverride = require("method-override")
// tells the user which port we are using from the file .env
const PORT = process.env.PORT || 3001
// bring in routes created in the controller file 
// const router = require('./controllers/')
const budget = require('./models/budget')
// tell the app to use our routes 
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use("/static", express.static("public"))
app.use('/public', express.static('public'));


//  Home page
app.get("/", (req, res) => res.redirect("/budget"))

// Index route 
app.get("/budget", (req, res) => {
    res.render("index.ejs", {
        allBudgets: budget
    })   
})

// New Route
app.get("/budget/new", (req, res) => {
    res.render("new.ejs")
})

//  Create Route
app.post("/budget", (req, res) => {
    budget.push(req.body)
    res.redirect("/budget")
    
})

// Show Route
app.get("/budget/:id", (req, res) => {
    res.render("show.ejs", {
        allBudgets: budget[req.params.id]
         
    })

})


// Listen lets our app know the port we are running on and to run that port
app.listen(PORT, () => {
    console.log(`I can see you: ${PORT}`)
})