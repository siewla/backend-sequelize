require("dotenv").config();
const users = require("./routes/users.js");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");

app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

app.use(
  cors({
    origin: process.env.FRONT_END_URL || "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
// extended: true precises that the req.body object will contain values of any type instead of just strings.
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res, next) => {
//   res.cookie("token", "just to set token in cookie");
//   // res.send("Cookie Set");
//   next();
// });

// app.get("/", (req, res) => {
//   console.log("Cookie SET");
// });

app.use("/users", users);

app.listen(PORT, () => {
  console.log(`API app listening on port ${PORT}`);
});
