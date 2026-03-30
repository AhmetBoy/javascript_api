const {Pool} = require("pg")

const pool = new Pool({
 user: "postgres",
 host: "localhost",
 database: "todoapp",
 password: "Ahmet123.?!182106*/#",
 port: 5432
})

module.exports = pool