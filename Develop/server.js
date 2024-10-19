const fs = require("fs"); // Import File System
const express = require("express"); // Import Express
const db = require("./db/db.json"); // Import db.json
const path = require("path"); // Import path

// Initialize an instance of Express.js // creates an express object
const app = express();
// Specifying on which port the Express.js server will run
const PORT = 3001;
// Invoke app.use() and serve static files from the '/public' folder
app.use(express.static("public"));

// GET routes that will serve up the 'notes.html' and 'index.html' respectively
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// Listen() method responsible for connections on PORT
app.listen(PORT, () =>
  console.log(`Note-Pad app listening at http://localhose:${PORT}`)
);
