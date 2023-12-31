// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const adminRoutes = require("./routes/admin.js");
const engineerRoutes = require("./routes/engineer.js");

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
    origin: ["https://ticketify-silk.vercel.app"],
    methods: ["GET", "POST", "PUT", "UPDATE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/engineer", engineerRoutes);

// Starting the server
app.listen(8080, () => {
  console.log("Server started!");
});
