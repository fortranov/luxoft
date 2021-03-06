var express = require('express');
var app = express();
var path = require('path');
var session = require('express-session');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var root = __dirname + '/..'

var MongoStore = require('connect-mongo/es5')(session);

var db = new Db('tutor',                                    // подключение к базе данных
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));

db.open(function(){
    console.log("mongo db is opened!");
});

db.collection('notes', function(error, notes) {             // таблица
    db.notes = notes;
});

db.collection('users', function(error, users) {
    db.users = users;
});

db.collection('sections', function(error, sections) {
    db.sections = sections;
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(root));       // задание корневой папки

app.listen(8080);

app.use(session({                                           // сохранение сессии в базе данных
    store: new MongoStore({
        url: 'mongodb://localhost:27017/angular_session'
    }),
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.post("/users", function(req,res) {
    db.users.insert(req.body, function(resp) {
        req.session.name = req.body.name;
        res.end();
    });
});

function setUserQuery(req) {
    req.query.name = req.session.name || "demo";
}

app.get("/notes", function(req,res) {
    setUserQuery(req);
    db.notes.find(req.query)
        .toArray(function(err, items) {
            res.send(items);
        });
});

app.get("/sections", function(req,res) {
    var userName = req.session.name || "demo";
    db.users.find({name:userName})
        .toArray(function(err, items) {
            var user = items[0];
            res.send(user.sections||[]);
        });
});

app.post("/notes", function(req,res) {                          // добавление записки
    req.body.name =  req.session.name || "demo";
    db.notes.insert(req.body);
    res.end();
});

app.post("/notes/edit/:id", function(req, res) {                // редактирование текста записки
    var id = new ObjectID(req.params.id);
    console.log(req.body);
    db.notes.update({_id: id}, { $set:{text: req.body.text} });
    res.end();
});

app.delete("/notes", function(req,res) {                        // удаление записки
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

app.post("/sections/replace", function(req,res) {
    var name = req.session.name || "demo";
    db.users.update({name:name},
        {$set:{sections:req.body}},
        function() {
            res.end();
        });
});

app.get("/checkUserUnique", function(req,res) {
   db.users.find({name : req.query.user}).count(function(err, count){
        res.send(!count);
    })
    //res.send(false);
});

app.post("/login", function(req,res) {
    db.users.find(
        {name:req.body.name,
            password:req.body.password})
        .toArray(function(err, items) {
            if (items.length>0) {
                req.session.name = req.body.name;
            }
            res.send(items.length>0);
        });
});

app.get("/logout", function(req, res) {
    req.session.name = null;
    res.end();
});

app.get("*", function(req, res, next) {
    res.sendFile('index.html', { root : root });
});
