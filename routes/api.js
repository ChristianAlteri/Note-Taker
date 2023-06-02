const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

const dbPath = path.join(__dirname, '..', 'db', 'db.json');

const router = express.Router();

// GET all notes. 
router.get('/notes', async (req, res) => {
    try {
        fs.readFile(dbPath, 'utf8', (error, data) => {
            if (error) {
                res.status(500).send('Internal Server Error');
            } else {
                const notes = JSON.parse(data);
                res.json(notes);
            }
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// POST create a note. store 
router.post('/notes', (req, res) =>{

    const { title, text } = req.body;

    if( title && text){
        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        readAndAppend(newNote, './db/db.json')
        res.json(`Note added successfully`);
    } else {
        res.status(500).send('Error in adding note. Note needs a title and text');
    }
})


// DELETE request
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Convert the result array back to JSON
        const jsonData = JSON.stringify(result);
        
  
        // Save the JSON data to the filesystem
        fs.writeFile('./db/db.json', jsonData, (err) => {
          if (err) {
            res.status(500).send('Internal Server Error');
            return;
          }
          // Respond to the DELETE request
          res.json(`Item ${noteId} has been deleted `);
        });
      });
  });

module.exports = router