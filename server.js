const express = require('express');
const path = require('path');
const app = express();
const { clog } = require('./middleware/clog');
// const api = require('./public/assets/js/index.js');
const api = require('./routes/api.js');

const PORT = process.env.PORT || 3001;

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use('/api', api);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page 
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Wildcard route to direct users to a 404 page
// Instructor said this was acceptable and * should not return 'index.html' as hw requirements request
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/pages/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



// Require the JSON file and assign it to a variable called `noteData`
const noteData = require('./db/db.json');
// app.get('/', (req, res) => res.send('Visit http://localhost:3001/api'));

// res.json() allows us to return JSON instead of a buffer, string, or static file
// app.get('/api', (req, res) => res.json(noteData));