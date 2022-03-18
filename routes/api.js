const router = require('express').Router();
const fs = require('fs');
const someData = require('../db/db.json');
const { nanoid } = require('nanoid');

// Sends the Notes data when the API is called
// Current route /api/notes:id
router.get('/notes', (req, res) => {

    res.json(someData);

});

// Reads the note entered by the user and appends it to the JSON file
// Current route /api/notes:id
router.post('/notes', (req, res) => {
    // Create new object to put re.body in so that we can add ID
    const newObject = req.body;
    newObject.id = nanoid();
    someData.push(newObject);

    // Writes newly created Note object to JSON file
    fs.writeFile('./db/db.json', JSON.stringify(someData), (error) => {
        if (error) return error;
    });

    res.end();
});

// Deletes the selected note from the page
// Current route /api/notes:id
router.delete('/notes/:id', (req, res) => {

    // Stores the selected ID in a new variable    
    const findNote = req.params.id;
    
    // Find the note associated with the selected ID and remove it from JSON
    for (let i = 0; i < someData.length; i++) {
        if (findNote == someData[i].id) {
            someData.splice(i,1);
            fs.writeFile('./db/db.json', JSON.stringify(someData), (error) => {
                if (error) throw error;
            });
        };
    };
    res.end();
});

module.exports = router;