const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const crypto = require('crypto');

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
router.post('/', (req, res) => {
    //требуем наличия логина и пароля в теле запроса
  if (!req.body.login || !req.body.password) {
        //если не указан логин или пароль - сообщаем об этом
    return res.json({status: 'Укажите логин и пароль!'});
  }

    //получаем модель пользователя и шифруем введенный пароль
  const Model = mongoose.model('user');
  const password = crypto.createHash('md5').update(req.body.password).digest('hex');

    //пытаемся найти пользователя с указанным логином и паролем
  Model.findOne({login: req.body.login, password: password}).then(item => {
        //если такой пользователь не найден - сообщаем об этом
        console.log(req.body.login);
        console.log(password);
    if (!item) {
      res.json({status: 'Логин и/или пароль введены неверно!'});
    } else {
          //если найден, то делаем пометку об этом в сессии пользователя, который сделал запрос
      req.session.isAdmin = true;      
      res.json({status: 'Авторизация успешна!',
  				redirect: '/admin'});
     
    }
  });
});

// router.get('/blog', function(req, res) {
//   let obj = {title: 'Blog'};
//   const Model = mongoose.model('blog');

//   Model.find().then(items => {
//     Object.assign(obj, {items: items});
//     res.render('pages/blog', obj);
//   });
  
// });

module.exports = router;