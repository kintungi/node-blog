const fs = require("fs");

//reading files
/*fs.readFile("./files/blog.js", (err, data) => {
    if(data) {
        console.log(`finished reading the file:
    data: ${data}`)
    console.log(data.toString())
    } else {
        console.log(err)
    }
})
console.log("loading...")*/

//writing files
/*fs.writeFile("./files/blog.js", "Overwritten data", (err, data) => {
    console.log("files was written")
})*/

//directories
if (!fs.existsSync("./assets")) {
    fs.mkdir("./assets", (err) => {
        if (err) {
            console.log(err)
        }
        console.log("folder created")
    })
} else {
    fs.rmdir("./assets", (err) => {
        if (err) {
            console.log(err)
        }
        console.log("folder deleted")
    })
}

//deleting files
if (fs.existsSync("./files/deleteme.txt")) {
    fs.unlink("./files/deleteme.txt", (err) => {
        if (err) {
            console.log(err)
        }
        console.log("file deleted")
    })
   
} if (err) {
        console.log(err)
    }
    console.log("file deleted")