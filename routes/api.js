const express = require('express');
const path = require('path');
const fs = require('fs');
const dbFilePath = path.join(__dirname, 'db', 'db.json');

const router = express.Router();
const app = express();


router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(dbFilePath, 'utf8');
        const jsonData = JSON.parse(data);
        res.json(jsonData)
    } catch (error) {
        res.status(500).send('Internal Server Error');  
    }
});



module.exports = router