const express = require('express');
const cors = require('cors');
const todoRoutes = require("./routes/todoRoutes")
const app = express();

app.use(express.json()) // Frontend’den gelen JSON verisini okuyabilmek için gerekir. POST isteklerinde body’deki veriyi okuyabilmek için kullanılır.

// app.use(cors({origin: 'http://localhost:5173'}))
app.use(cors());

app.use("/",todoRoutes)

app.listen(3000,()=>{
    console.log("Server started.")
})