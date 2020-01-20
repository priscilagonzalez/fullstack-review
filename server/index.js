var db = require('../database');
var github = require('../helpers/github.js');
const parser = require('body-parser');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(parser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.username;
  github.getReposByUsername(username, (err, repos) => {
    if (err) {
      console.error(err);
    } else {
      res.json(repos);
      db.save(username, repos, (err, result) => {
           if (err) {
             console.error(err);
           } else {
             console.log("Repos saved");
             console.log(result);
           }
      });
    }
  });

  // db.save(username);
  // github.getReposByUsername("octocat");
  // res.sendStatus(200);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

