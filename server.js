const express = require("express");
const connectDB = require("./config/db");
const path = require("path");


const app = express();

//conect database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the todos API..." })
);

//define routes
app.use("/api/users", require("./backendroutes/users"));
app.use("/api/auth", require("./backendroutes/auth"));
app.use("/api/todos", require("./backendroutes/todos"));


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
