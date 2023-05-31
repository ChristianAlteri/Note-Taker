const express = require('express')
const path = require('path')

app = express()
const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', require('./routes/api'));  

// Set path to the notes.html
app.get('/notes', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'notes.html');
    res.sendFile(filePath);
  });

// Wildcard route handler for GET *
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });  


app.listen(PORT, () => console.log(`server started on ${PORT}`))
