const path = require('path');
const router = require('express').Router();

// GET Route for homepage
router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/index.html'))
);

// GET Route for notes page 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Wildcard route to direct users to a 404 page
// Instructor said this was acceptable and * should not return 'index.html' as hw requirements request
router.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, '../public/pages/404.html'))
);

// exporting router for the routes
module.exports = router;