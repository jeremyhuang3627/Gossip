var express       = require('express');
var path          = require('path');
var port          = process.env.PORT || 3000;
var passport      = require('passport');
var flash         = require('connect-flash');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
var app           = express();
var configDB 	  = require('./config/database.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'jeremylovesanna' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

mongoose.connect(configDB.url);
require('./routes/index')(app);

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Gossip is listening at http://%s:%s', host, port);
});
