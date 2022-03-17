const router = require('express').Router();
const fs = require('fs');

// Sends the Notes data when the API is called
// Current route /api/notes:id
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        if (error) throw error;

        // Parse Data from Response.json
        res.json(JSON.parse(data));
    });
});

// Reads the note entered by the user and appends it to the JSON file
// Current route /api/notes:id
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        if (error) throw error;
        let readAndAppend = JSON.parse(data);
        readAndAppend.push(req.body);

        // console.log(`readAndAppend`,readAndAppend);
        
        fs.writeFile('./db/db.json', JSON.stringify(readAndAppend), (error) => {
            if (error) return error;
        });
    });
    res.end();
});

// Deletes the selected note from the page
// Current route /api/notes:id
router.delete('/notes/:id', (req, res) => {
    const findNote = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        if (error) throw error;

        let readAndDelete = JSON.parse(data);
        // console.log(`readAndDelete`,readAndDelete);
        // console.log(`findNote`, findNote);

        // Find the note associated with the selected ID and remove it from JSON
        for (let i = 0; i < readAndDelete.length; i++) {
            if (findNote == readAndDelete[i].id) {
                readAndDelete.splice(i,1);
                fs.writeFile('./db/db.json', JSON.stringify(readAndDelete), (error) => {
                    if (error) throw error;
                });
            };
        };
    });
    res.end();
});

module.exports = router;