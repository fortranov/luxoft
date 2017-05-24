var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var MongoStore = require('connect-mongo/es5')(session);

var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));

db.open(function(){
    console.log("mongo db is opened!");
});

db.collection('notes', function(error, notes) {
    db.notes = notes;
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var notes_init = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost:27017/angular_session'
    }),
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.get("/notes", function(req,res) {
    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});

app.post("/notes", function(req,res) {
    db.notes.insert(req.body);
    res.end();
});

app.post("/notes/edit/:id", function(req, res) {
  //  console.log("Editing: ", req.params.id);
    var id = new ObjectID(req.params.id);
    console.log(req.body);
    db.notes.update({_id: id}, { $set:{text: req.body.text} });
    res.end();
});

app.delete("/notes", function(req,res) {
    var id = new ObjectID(req.query.id);
    db.notes.remove({_id: id}, function(err){
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

app.put("/notes/:id", function(req, res) {
    var id = req.params.id;
    console.log("sending to top note: ", id);
    var noteOne  = req.session.notes.splice(id,1)[0];
    req.session.notes.unshift(noteOne);
    console.log("Notes: ", req.session.notes);
    res.end();
});

app.use(express.static(path.join(__dirname, '..')));

app.listen(8080);


/*

FOLDER STRUCTURE:

root
  app 
  server
     server.js
	 package.json
  index.html
  package.json
  
*/
  