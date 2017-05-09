var config          = require('./config'),
    http            = require('http'),
    socketio        = require('socket.io'),
    express         = require('express'),
    morgan          = require('morgan'),
    compress        = require('compression'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    session         = require('express-session'),
    MongoStore      = require('connect-mongo')(session),
    passport        = require('passport');

module.exports = function(db) {
  var app = express();
  var server = http.createServer(app);
  var io = socketio.listen(server);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(config.client_allowed);

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(methodOverride());

  var mongoStore = new MongoStore({
    mongooseConnection: db.connection
  });

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store:  mongoStore
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/stuff.server.routes.js')(app);
  require('../app/routes/wish.server.routes.js')(app);

  app.use(express.static('./public'));

  require('./socketio')(server, io, mongoStore);

  return server;
};
