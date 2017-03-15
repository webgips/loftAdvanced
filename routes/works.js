const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function(req, res) {
   let obj = {
    title: 'Мои работы',
    name: 'Марков Максим'
  };
  // const Model = mongoose.model('pic');

  // Model.find().then(items => {
  //   Object.assign(obj, {items: items});
    res.render('pages/works', obj);
  // });

});

module.exports = router;