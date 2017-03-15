const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const currentStatic = require('./gulp/config').root;
const config = require('./config.json');
const uploadDir = config.upload;

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/*
mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
  user: config.db.user,
  pass: config.db.password
}).catch(e => {
  console.error(e);
  throw e;
});
*/
mongoose.connect('mongodb://loftschool:567234@ds123080.mlab.com:23080/myportfolio');

//подключаем модели(сущности, описывающие коллекции базы данных)
// require('./models/blog');
// require('./models/pic');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, currentStatic)));

app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/works', require('./routes/works'));
app.use('/blog', require('./routes/blog'));

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res
    .status(404)
    .render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res
    .status(500)
    .render('500');
});

server.listen(3000, 'localhost');
server.on('listening', function () {
  // if (!fs.existsSync(uploadDir)) {
  //   fs.mkdirSync(uploadDir);
  // }
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});