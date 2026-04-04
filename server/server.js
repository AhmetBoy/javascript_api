require('dotenv').config();
const express = require('express');
const cors = require('cors');
const todoRoutes = require("./routes/todoRoutes")
const app = express();


app.use(express.json()) // Frontend’den gelen JSON verisini okuyabilmek için gerekir. POST isteklerinde body’deki veriyi okuyabilmek için kullanılır.

// app.use(cors({origin: 'http://localhost:5173'}))
app.use(cors());

app.use("/",todoRoutes)


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})