const fs = require("fs");
const notesArray = require("../db/db.json")

module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    fs.readFile("./Develop/db/db.json",'utf8', function(err, data){
      if (err) {
          console.log(err)
      }
      else {
          res.json(JSON.parse(data))
      }
    })
  });

  // API POST Requests

  app.post("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', "utf8", function (err, data) {
      if (err) throw err;

      var note = JSON.parse(data)
      req.body.id = note.length + 1
      note.push(req.body)
      res.send();
  
      fs.writeFile("./db/db.json", JSON.stringify(note), function(err){
          if (err) throw err;
          console.log(`Note Added`)
      })
    })
  });

// API Delete

app.delete("/api/notes/:id", function(req, res){
  var id = parseInt(req.params.id)
  fs.readFile('./db/db.json', "utf8", function (err, data) {
      if (err) throw err;
      var notesArray = JSON.parse(data)
      var note = notesArray.find(function(note){
          return note.id === id
      });

      var index = notesArray.indexOf(note)
      notesArray.splice(index, 1)  
      fs.writeFile("./db/db.json", JSON.stringify(notesArray), function(err){
        if (err) throw err;
        console.log(`Deleting note`)
      })
  })
  res.send();
})
};