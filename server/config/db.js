// const {Pool} = require("pg")

// const pool = new Pool({
//  user: "postgres",
//  host: "localhost",
//  database: "todoapp",
//  password: "Ahmet123.?!182106*/#",
//  port: 5432
// })

// module.exports = pool

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
pool.connect()
  .then(() => console.log("DB CONNECTED"))
  .catch(err => console.error("DB CONNECTION ERROR:", err));

module.exports = pool;