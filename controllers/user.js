var fs = require('fs');
var formidable = require('formidable');
var scriptStorage = require('./scriptStorage');
var User = require('../models/user').User;
var Script = require('../models/script').Script;
var RepoManager = require('../libs/repoManager');
var scriptsList = require('../libs/modelsList');
var async = require('async');
var nil = require('../libs/helpers').nil;

exports.view = function (req, res, next) {
  var username = req.route.params.shift();
  var thisUser = req.session.user;

  User.findOne({ name: username }, function (err, user) {
    if (err || !user) { return next(); }

    scriptsList.listScripts({ _authorId: user._id },
      req.route.params, ['author'], '/users/' + username,
      function (scriptsList) {
        res.render('user', { 
          'res': res,
          title: user.name,
          name: user.name,
          about: user.about, 
          isYou: thisUser && thisUser.name === user.name,
          scriptsList: scriptsList
      });
    });
  });
}

exports.edit = function (req, res) {
  var user = req.session.user;

  if (!user) { return res.redirect('/login'); }

  scriptsList.listScripts({ _authorId: user._id },
  { size: -1 }, ['author'], '/user/edit',
    function (scriptsList) {
      scriptsList.edit = true;
      res.render('userEdit', { 
        'res': res,
        title: 'Edit Yourself',
        name: user.name,
        about: user.about, 
        scriptsList: scriptsList
      });
  });
};

exports.scripts = function (req, res) {
  var user = req.session.user;
  var indexOfGH = -1;
  var ghUserId = null;
  var repoManager = null;
  var options = null;
  var loadingRepos = false;
  var reponame = null;
  var repo = null;
  var repos = null;
  var scriptname = null;
  var loadable = null;
  var form = null;

  if (!user) { return res.redirect('/login'); }

  // TODO: Organize this code
  if (/multipart\/form-data/.test(req.headers['content-type'])) {
    form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var script = files.script;
      var stream = null;
      var bufs = [];

      // Reject non-js and huge files
      if (script.type !== 'application/javascript' && 
          script.size > 500000) { return res.redirect('/user/edit/scripts'); }

      stream = fs.createReadStream(script.path);
      stream.on('data', function (d) { bufs.push(d); });

      // Pardon the depth
      stream.on('end', function () {
        User.findOne({ _id: user._id }, function (err, user) {
          scriptStorage.getMeta(bufs, function (meta) {
            scriptStorage.storeScript(user, meta, Buffer.concat(bufs),
              function(script) {
                res.redirect('/users/' + user.name);
            });
          });
        });
      });
    });
    return;
  }

  options = { 'res': res, title: 'Edit Scripts', username: user.name };

  indexOfGH = user.strategies.indexOf('github');
  if (indexOfGH > -1) {
    options.hasGH = true;

    if (req.body.importScripts) {
      loadingRepos = true;
      options.showRepos = true;
      ghUserId = user.auths[indexOfGH];

      User.findOne({ _id: user._id }, function (err, user) {
        repoManager = RepoManager.getManager(ghUserId, user);

        repoManager.fetchRepos(function() {
          // store the vaild repos in the session to prevent hijaking
          req.session.repos = repoManager.repos;

          // convert the repos object to something mustache can use
          options.repos = repoManager.makeRepoArray();
          res.render('scriptsEdit', options, res);
        });
      });
    } else if (req.body.loadScripts && req.session.repos) {
      loadingRepos = true;
      repos = req.session.repos;
      loadable = nil();

      for (reponame in req.body) {
        repo = req.body[reponame];

        // Load all scripts in the repo
        if (typeof repo === 'string' && reponame.substr(-4) === '_all') {
          reponame = repo;
          repo = repos[reponame];

          if (repo) {
            for (scriptname in repo) {
              if (!loadable[reponame]) { loadable[reponame] = nil(); }
              loadable[reponame][scriptname] = repo[scriptname];
            }
          }
        } else if (typeof repo === 'object') { // load individual scripts
          for (scriptname in repo) {
            if (repos[reponame][scriptname]) {
              if (!loadable[reponame]) { loadable[reponame] = nil(); }
              loadable[reponame][scriptname] = repos[reponame][scriptname];
            }
          }
        }
      }

      User.findOne({ _id: user._id }, function (err, user) {
        // Load the scripts onto the site
        RepoManager.getManager(ghUserId, user, loadable).loadScripts(
          function () {
            delete req.session.repos;
            res.redirect('/users/' + user.name);
        });
      });
    }
  }

  if (!loadingRepos) { res.render('scriptsEdit', options); }
}

exports.update = function (req, res) {
  var user = req.session.user;
  var scriptUrls = req.body.urls ? Object.keys(req.body.urls) : '';
  var installRegex = null;
  var installNames = [];
  var username = user.name.toLowerCase();

  if (!user) { return res.redirect('/login'); }

  if (req.body.about) {
    User.findOneAndUpdate({ _id: user._id }, 
      { about: req.body.about  },
      function (err, user) {
        if (err) { res.redirect('/'); }

        req.session.user.about = user.about;
        res.redirect('/users/' + user.name);
    });
  } else {
    installRegex = new RegExp('^\/install\/(' + username + '\/.+)$');
    scriptUrls.forEach(function (url) {
      var matches = installRegex.exec(url);
      if (matches && matches[1]) { installNames.push(matches[1]); }
    });
    async.each(installNames, scriptStorage.deleteScript, function () {
      res.redirect('/users/' + user.name);
    });
  }
};

exports.newScript = function (req, res, next) {
  var user = req.session.user;
  var source = null;
  var url = null;

  if (!user) { return res.redirect('/login'); }

  if (req.body.url) {
    source = new Buffer(req.body.source);
    url = req.body.url;

    scriptStorage.getMeta([source], function (meta) {
      if (!meta || !meta.name) { return res.redirect(url); }

      User.findOne({ _id: user._id }, function (err, user) {
        scriptStorage.storeScript(user, meta, source, function (script) {
          var redirectUrl = '/scripts/' + script.installName
            .replace(/\.user\.js$/, '');

          if (!req.body.original) { return res.redirect(redirectUrl); }

          Script.findOne({ installName: req.body.original }, 
            function (err, origScript) {
              var fork = null;
              if (err || !origScript) { return res.redirect(redirectUrl); }

              fork = origScript.fork || [];
              fork.shift({ author: origScript.author, url: origScript
                .installName.replace(/\.user\.js$/, '') });
              script.fork = fork;

              script.save(function (err, script) {
                res.redirect(redirectUrl);
              });
          });
        });
      });
    });
  } else {
    res.render('scriptEditor', {
      'res': res,
      title: 'Write a new script',
      source: '',
      url: req.url,
      owner: true,
      readOnly: false
    });
  }
};

exports.editScript = function (req, res, next) {
  var user = req.session.user;
  var installName = null;

  req.route.params.scriptname += '.user.js';
  scriptStorage.getSource(req, function (script, stream) {
    var bufs = [];

    if (!script) { return next(); }

    stream.on('data', function (d) { bufs.push(d); });
    stream.on('end', function () {
      res.render('scriptEditor', {
        'res': res,
        title: 'Edit ' + script.name,
        source: Buffer.concat(bufs).toString('utf8'),
        original: script.installName,
        url: req.url,
        owner: user && script._authorId == user._id,
        readOnly: !user
      });
    });
  });
};
