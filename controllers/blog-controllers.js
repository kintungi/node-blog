const Blog = require("../models/blog")

const blog_index = (req, res) => {
    Blog.find().sort({creat})
}