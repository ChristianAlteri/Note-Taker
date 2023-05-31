const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const dbPath = path.join(__dirname, '..', 'db', 'db.json');

const router = express.Router();


router.get('/notes', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '../db/db.json');
        fs.readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                res.status(500).send('Internal Server Error');
            } else {
                const notes = JSON.parse(data);
                res.json(notes);
                console.log("success" + notes.title + notes.text + "logged");
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router