const router = require('express').Router();
const fs = require('fs');
const db = require('../db/db.json')
const path = require("path");

// Display notes
router.get("/notes", (req, res) => {
    res.send(db)
});


module.exports = router