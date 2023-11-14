require('dotenv').config();

const express = require('express');
const app = express()
const PORT = 4000;
const cors = require('cors')
const mongoose = require("mongoose");
const Middlewares= require('./helpers/middlewares')
const Router = require('./routes')

app.use(cors())
app.use(express.json())
app.use(Middlewares.authenticationMiddleware);
app.use(Router);
app.use(Middlewares.errorHandlersMiddleware);


// Database and server connection
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
  console.log("Database is Connected")
  app.listen(PORT, () => {
    console.log("Server is Running on Port 4000")
  })
})
.catch((err) => {
  console.log("error during Database Connetion", err)
})

