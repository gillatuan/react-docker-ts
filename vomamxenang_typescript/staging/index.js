import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import passport from "passport"
import cors from 'cors'

const app = express()
app.use(cors())

import users from "./routes/api/users.js"
import modules from "./routes/api/modules.js"
import media from "./routes/api/media.js"
import posts from "./routes/api/posts.js"
import settings from "./routes/api/settings.js"

import { getResponsePassport } from './config/passport.js'


// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50Mb",
    parameterLimit: 50000,
  }),
)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
  next()
})

// DB Config
const db = process.env.mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
getResponsePassport(passport)

// route
app.get('/', (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", users)
app.use("/api/modules", modules)
app.use("/api/media", media)
app.use("/api/posts", posts)
app.use("/api/settings", settings)

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("You are running on port: ", process.env.PORT)
})
