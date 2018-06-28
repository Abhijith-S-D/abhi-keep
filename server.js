// server.js
var express        = require('express');
var MongoClient    = require('mongodb').MongoClient,format=require('util').format;
var bodyParser     = require('body-parser');
var db             = require('./config/db');
var app            = express();
var normalizePort  = require('normalize-port')
var port = normalizePort(process.env.PORT || 8080);

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  // Make sure you add the database name and not the collection name
  db = database.db("notes")
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
  //database.close();
});