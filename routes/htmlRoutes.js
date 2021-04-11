//Dependency
const path = require('path');

module.exports = (app) =>{
    //HTML GET requests
    app.get('/notes', (req,res) =>{
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    app.get('/', (req,res) =>{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};