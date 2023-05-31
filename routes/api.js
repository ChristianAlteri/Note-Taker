const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const dbPath = path.join(__dirname, '..', 'db', 'db.json');

const router = express.Router();



router.get('/notes', (req, res) => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        res.json(data)
    } catch (error) {
        res.status(500).send('Internal Server Error');  
    }
});



module.exports = router