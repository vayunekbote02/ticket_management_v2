// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");
const authenticateToken = require("./middleware/authorization"); //Remove later

// Connecting to database
mongoose
  .connect(
    "mongodb+srv://vayunekbote02:hRILdeiMoK8Mf3PL@cluster0.qxy9x8k.mongodb.net/ts?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

// Initializations
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "UPDATE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.get("/api/user/:userId/tickets", authenticateToken, (req, res) => {
  if (req.userId === req.params.userId) {
    return res.json({ text: `Authenticated ${req.userId}` });
  } else {
    return res.json({ text: "Failed to connect" });
  }
});

app.get("/setcookie", (req, res) => {
  res.cookie(`Cookie token name`, `encrypted cookie string Value`, {
    maxAge: 5000,
    // expires works the same as the maxAge
    expires: new Date("01 12 2021"),
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  });
  res.send("Cookie have been saved successfully");
});

app.get("/getcookie", (req, res) => {
  //show the saved cookies
  console.log(req.cookies);
  res.send(req.cookies);
});

// Starting the server
app.listen(8080, () => {
  console.log("Server started!");
});
