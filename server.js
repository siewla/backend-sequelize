require("dotenv").config();
const users = require("./routes/users.js");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const MemoryStore = require("memorystore")(session);

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
  cookie: {
    secure: true,
    sameSite: "none",
  },
};

app.use(session(sessionConfig));
app.set("trust proxy", 1);
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_END_URL || "http://localhost:3000",
    credentials: true,
    preflightContinue: false,
    exposedHeaders: ["set-cookie"],
  })
);

// for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
// extended: true precises that the req.body object will contain values of any type instead of just strings.
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);

app.listen(PORT, () => {
  console.log(`API app listening on port ${PORT}`);
});
