require("dotenv").config()
const mongoose = require("mongoose");
const db = process.env.DATABASE_URL

//mongoose connection 
 mongoose.connect(db)
.then((result) => console.log("Database connected"))
.catch((err) => console.log(err))

