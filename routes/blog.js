const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
   let obj = {
    title: 'Блог',
    name: 'Марков Максим'
  };
  // const Model = mongoose.model('pic');

  // Model.find().then(items => {
  //   Object.assign(obj, {items: items});
    // res.render('pages/blog', obj);
  // });
	const Model = mongoose.model('blog');

  Model.find().then(posts => {
    Object.assign(obj, {posts: posts});
    res.render('pages/blog', obj);
    console.log(obj);
  });

});

module.exports = router;