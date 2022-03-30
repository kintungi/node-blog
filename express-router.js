const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog-routes")
// const Blog = require("./models/blog")
const serverless = require("serverless-http")

//express app
const app = express()

const dbURI = "mongodb+srv://francis:test1234@nodetuts.g1ar2.mongodb.net/node-tuts?retryWrites=true&w=majority"

// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(result => app.use("/.netlify/functions/express-router", router))
// .catch(err => console.log(err))

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => app.listen(7000))
.catch(err => console.log(err))

//register a view engine
app.set("view engine", "ejs")

app.set("views", "templates")

// app.listen(7000)

//middleware and static files
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))


app.get("/about", (req, res) => {
    // res.send('<h1>hello I am express</h1>')
    res.render("about", {title: "About"})
    // res.sendFile("./views/about.html", {root: __dirname})
})

app.get("/", (req, res) => {

    res.redirect("/blogs")
})

app.use("/blogs", blogRouter)

//404 page
app.use((req, res) =>{
    res.status(404).render("404", {title: "404"})
    // res.status(404).sendFile("./views/404.html", {root: __dirname})
    })
/*You don't need to specify the request url, it is used for all types
of requests unless specified otherwise*/

// module.exports.handler = serverless(app)