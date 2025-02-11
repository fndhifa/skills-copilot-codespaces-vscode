// Create web server
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// Read data from file
var data = fs.readFileSync('comment.json');
var comments = JSON.parse(data);

// Set the server to listen on port 3000
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});

// Set the server to use bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the server to use public folder
app.use(express.static('public'));

// Set the server to use ejs
app.set('view engine', 'ejs');

// Render index.ejs
app.get('/', function (req, res) {
  res.render('index', {comments: comments});
});

// Add comments to the list
app.post('/addComment', function (req, res) {
  var newComment = req.body;
  comments.push(newComment);
  fs.writeFile('comment.json', JSON.stringify(comments), function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
});

// Delete comments from the list
app.post('/deleteComment', function (req, res) {
  var deleteComment = req.body;
  comments.splice(deleteComment.id, 1);
  fs.writeFile('comment.json', JSON.stringify(comments), function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/');
});