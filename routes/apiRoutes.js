const path = require('path');
const fs = require('fs');
//const db = require('../db/db.json')
const { v4: uuidv4 } = require('uuid');

//dataRead = () => JSON.parse(fs.readFileSynce('./db/db.json','utf8'));
module.exports = (app) => {
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    app.get("/api/notes", (req,res) =>{
      console.log( 'Getting notes');
      //Reading the db.json file
      let note; 
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        note = data;
        console.log('Returning note data: ' +JSON.parse(note));
      //sending the data to the response of the GET request
      res.json(JSON.parse(note))
      });
      
    });


    app.get('/api/notes/:id', (req, res) => {
      let postId = req.params.id;
      let note; 
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        console.log('Returning note data: ' +JSON.parse(data));
      //sending the data to the response of the GET request
      const newData = JSON.parse(data).filter(post => post.id === postId);
      console.log(`Getting specific note for:  ${newData}`);
      res.json(newData);
      
    });
  });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array

    app.post('/api/notes', (req, res) => {
      //The req.body allows access to the data in the json object in the db folder
        const newPost = req.body;
        //Setting a unique id maker for every newPost object
        newPost.id = uuidv4();
        //Reading data
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
        //pushing newPost to the data file
        console.log('TEST' , data);
        const newData = JSON.parse(data)
        newData.push(newPost);
        //fs write the file to the db.json file
        fs.writeFileSync('./db/db.json', JSON.stringify(newData));
        
        console.log('Note: ' +newPost.title+ ' has been added');
        res.json(newData);
    });
  });
      app.delete('/api/notes/:id', (req, res) =>{
        console.log('PING');
        //grabbing the id from the api
        let postId = req.params.id;
        //reading data from json file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
        //grabbing all out data without the matching postID
        const newData = JSON.parse(data).filter(post => post.id !== postId)
        console.log(newData);
        //Rewrites the data file without the object we wanted deleted.
        fs.writeFile('./db/db.json', JSON.stringify(newData), function(err) {
          // If an error occurred, show it and return
          if(err) return console.error(err);
          console.log(`Successfully deleted post : ${newData}`, newData);
          res.json(true);
        });
       
      });
   });

    

} 