const fs = require("fs");

const readStream = fs.createReadStream("./files/blog1.txt", {encoding: "utf8"});

const writeStream = fs.createWriteStream("./files/blog2.txt")




readStream.on("data", (chunk) => {
    console.log("--------NEW CHUNK--------")
    console.log(chunk)

    writeStream.write("\n-----NEW CHUNK----\n")
    writeStream.write(chunk)
})

//piping
const writeStream2 = fs.createWriteStream("./files/blog3.txt")

readStream.pipe(writeStream2)