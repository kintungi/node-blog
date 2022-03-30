const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog")

//express app
const app = express()

const dbURI = "mongodb+srv://francis:test1234@nodetuts.g1ar2.mongodb.net/node-tuts?retryWrites=true&w=majority"

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

//mongoose and mongo sandbox routes
/*app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "blog2",
        snippet: "about my new blog",
        body: 5667676
    });

    blog.save()
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})

app.get("/all-blogs", (req, res) => {
    Blog.find()
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err)
    })
})

app.get("/single-blog", (req, res) => {
    Blog.findById("6228d10a73ea78e1e1be018d")
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
})*/

//custom logger middlewares
/*app.use((req, res, next) => {
    console.log("new request made");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method", req.method);
    next()
});

app.use((req, res, next) => {
    console.log("In the next middleware");
    next()
});*/

app.get("/", (req, res) => {

    res.redirect("/blogs")
   /* const blogs = [
        {title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consecteur"},
        {title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consecteur"},
        {title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consecteur"}
    ]
    // res.send('<h1>hello I am express</h1>')
    res.render("index", {title: "Francis blogpost", blogs})
    // res.sendFile("./views/index.html", {root: __dirname})*/
})

app.get("/about", (req, res) => {
    // res.send('<h1>hello I am express</h1>')
    res.render("about", {title: "About"})
    // res.sendFile("./views/about.html", {root: __dirname})
})

app.get("/blogs/create", (req, res) => {
    res.render("create", {title: "Create a new blog"})
    // res.send("hello")
})

//blogs routes
app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        res.redirect("/blogs")
    }).catch(err => console.log(err))
})

app.get("/blogs/:id", (req, res) => {
    console.log(req.params.id)

    Blog.findById(req.params.id)
        .then(result => {
            res.render("details", { blog: result, title: "Blog Details" })
        })
        .catch(err => console.log(err))
})

//deleting data
app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: "/blogs"})
        })
        .catch(err => console.log(err))
})



app.get("/blogs", (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render("index", {title: "All Blogs", blogs: result})
        })
        .catch(err => console.log(err))
})




//404 page
app.use((req, res) =>{
    res.status(404).render("404", {title: "404"})
    // res.status(404).sendFile("./views/404.html", {root: __dirname})
    })
/*You don't need to specify the request url, it is used for all types
of requests unless specified otherwise*/