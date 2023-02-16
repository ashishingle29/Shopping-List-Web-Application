const express = require("express")
const mongoose = require("mongoose")
const serverless = require('serverless-http');
const route = require("../src/routes/route")
const app = express()

app.use(express.json())

const cors = require('cors')
app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb+srv://harsh258:Wb5QwC0mG0iUBIXS@new-cluster.baoq1vx.mongodb.net/ShoppingList-DB", { useNewUrlParser: true })
    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(err.message))

app.use("/.netlify/functions/api", route)

module.exports.handler = serverless(app);