const fs = require("fs"); // Import File System
const express = require("express"); // Import Express
const db = require("./db/db.json"); // Import db.json
const path = require("path"); // Import path
const { v4: uuidv4 } = require("uuid"); // Helper to generate ids

// Initialize an instance of Express.js // creates an express object
const app = express();

// Specifying on which port the Express.js server will run
const PORT = 3001;

// Invoke app.use() and serve static files from the '/public' folder
app.use(express.static("public"));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET routes that will serve up the 'notes.html' and 'index.html'
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// API routes GET
app.get("/api/notes", (req, res) => {
  console.log("Help");
  // Read notes from db.json
  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read notes" });
    }
    // res.json(data);
    res.json(JSON.parse(data));
  });
});

// API routes POST
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title, // Get the title from the request body
    text: req.body.text, // Get the text from the request body
  };

  fs.readFile(path.join(__dirname, "db/db.json"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read notes" });
    }

    // Parse the existing notes and adds new note
    const notes = JSON.parse(data);
    notes.push(newNote);
    // for deleting, filter out  lines 46-66 (replace 53 with filter array method req.params.id)
    try {
      fs.writeFileSync(
        path.join(__dirname, "db/db.json"),
        JSON.stringify(notes, null, 2),
        "utf8"
      );
      // Sends new note as response
      res.json(newNote);
    } catch (err) {
      return res.status(500).json({ error: "Failed to save note" });
    }
  });
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// Listen() method responsible for connections on PORT
app.listen(PORT, () =>
  console.log(`Note-Pad app listening at http://localhost:${PORT}`)
);
