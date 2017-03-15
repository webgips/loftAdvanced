const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
  let obj = {
    title: 'Личный сайт веб разработчика',
    name: 'Марков Максим'
  };
  // const Model = mongoose.model('pic');

  // Model.find().then(items => {
  //   Object.assign(obj, {items: items});
    res.render('pages/index', obj);
  // });

});

router.get('/blog', function(req, res) {
  let obj = {title: 'Blog'};
  const Model = mongoose.model('blog');

  Model.find().then(items => {
    Object.assign(obj, {items: items});
    res.render('pages/blog', obj);
  });
  
});

module.exports = router;