// console.log(global)

setTimeout(() => {
    console.log("in the timeout");
    clearInterval(interval)
    console.log(__dirname)
    console.log(__filename)

}, 3000)

const interval = setInterval(() => {
    console.log("I write after every one 1 second")
}, 1000)