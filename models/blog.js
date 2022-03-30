const mongoose = require("mongoose")

const Schema = mongoose.Schema


/*
Here we say that we want the document in our collections
to have the following data structure. The second argument
is an options object inside which we can add a
timestamp option to true so that mongoose
can generate automatic times and dates when we
create our documents.
*/
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

//creating a model and attaching its name and schema
const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog