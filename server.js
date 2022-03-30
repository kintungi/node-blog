const http = require("http")

const fs = require("fs")

const server = http.createServer((request, response) => {
    console.log(request.url, request.method )

    response.setHeader("content-type", "text/html")

    /*response.write("<p>Hello francis</p>")
    response.write("<p>Hello again francis</p>")

    response.end()*/

    //switching paths
    let path = "./views/"

    switch(request.url) {
        case "/": 
        path += "index.html";
        response.statusCode = 200;
        break;

        case "/home": 
        // path += "index.html";
        response.statusCode = 301;
        response.setHeader("location", "/")
        response.end()
        break;

        case "/about": 
        path += "about.html";
        response.statusCode = 200;
        break;

        case "/about-me": 
        response.statusCode = 301;
        response.setHeader("location", "/about")
        response.end()
        break;

        case "/services": 
        path += "services.html"
        response.statusCode = 200;
        break;

        default: 
        path += "404.html"
        response.statusCode = 404;
        break;
    }

    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err);
            response.end()
        } else {
            // response.write(data)
            response.end(data)
        }
    })
})

//making the server listen to the ipdress or localhost
server.listen(7000, "localhost", () => {
    console.log("Listening for requests on port 7000")
})

