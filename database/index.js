const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!user:
  username: String,
  repos: [{
    id: {type: Number, unique: true},
    name: String,
    description: String,
    url: String,
    forks: Number,
    created_at: Date,
    watchers: Number
  }]
});

let Repo = mongoose.model('Repo', repoSchema);
//console.log(Repo);

let save = (username, repos, callback) => {
  console.log("SAVE FUNCTION");
  //console.log("Accessing the repos from save function", repos);
  var repo = {};
  repo.repos = [];
  repo.username = repos[0].owner.login;
  for (var i = 0; i < repos.length; i++) {
    var currentRepo = repos[i];
    console.log(repos.length);
    var repoInfo = {
    name: currentRepo.name,
    description: currentRepo.owner.description,
    url: currentRepo.owner.url,
    forks: currentRepo.owner.forks,
    created_at: currentRepo.owner.created_at,
    watchers: currentRepo.owner.Number
    }
    repo.repos.push(repoInfo);
  }

  var newRepo = new Repo(repo);
  console.log("newRepo", newRepo);
  newRepo.save(function (err) {
  if (err) return handleError(err);
    console.log(err);
  });
  callback(null, "SAVED IS WORKING");

}

module.exports.save = save;






