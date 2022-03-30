const express = require("express")

const Blog = require("../models/blog")

const router = express.Router()





router.get("/create", (req, res) => {
    res.render("create", {title: "Create a new blog"})
    // res.send("hello")
})

//blogs routes
router.post("/", (req, res) => {
    const blog = new Blog(req.body)

    blog.save().then(result => {
        res.redirect("/blogs")
    }).catch(err => console.log(err))
})

router.get("/:id", (req, res) => {
    console.log(req.params.id)

    Blog.findById(req.params.id)
        .then(result => {
            res.render("details", { blog: result, title: "Blog Details" })
        })
        .catch(err => res.status(404).render("404", {title: "Blog not found"}))
})

//deleting data
router.delete("/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: "/blogs"})
        })
        .catch(err => console.log(err))
})

router.get("/", (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then(result => {
            res.render("index", {title: "All Blogs", blogs: result})
        })
        .catch(err => console.log(err))
})

module.exports = router



