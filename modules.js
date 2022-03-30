const {ages, people} = require("./people")

const os = require("os")

console.log(ages, people)
console.log(os.hostname(), os.version(), os.type())