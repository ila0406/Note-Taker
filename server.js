const express = require('express');
const path = require('path');
const app = express();
const { clog } = require('./middleware/clog');
const api = require('./routes/api.js');
const html = require('./routes/html.js');

const PORT = process.env.PORT || 3001;

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use('/api', api);  //Most be after JSON or it can't store it
app.use(express.urlencoded({ extended: true }));  //helps front end and back end talk in the same language
app.use(express.static('public'));
app.use('/', html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);