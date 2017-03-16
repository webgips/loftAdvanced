const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');
const smtpTransport = require('nodemailer-smtp-transport');

router.get('/', function(req, res) {
   let obj = {
    title: 'Страница "Обо мне"',    
  };  
    if(req.session.isAdmin){
       res.render('pages/admin', obj);
    }
    else{
       res.send('У вас нет прав доступа');
    }   
});
// router.post('/', isAdmin, (req, res) => {
//     //требуем наличия значений
//   if (!req.body.title || !req.body.date || !req.body.text) {
//     //если что-либо не указано - сообщаем об этом    
//     return res.json({status: 'Укажите данные!'});
//   }
//   const Model = mongoose.model('skills');
//   let skills = new Model({HTML: req.body.html, CSS: req.body.css,
//    JavaScript: req.body.js, });
//   skills.save().then(
//     (i) => {return res.json({status: 'Запись успешно добавлена'});},
//     (e) => {
//       const error = Object
//         .keys(e.errors)
//         .map(key => e.errors[key].message)
//         .join(', ');
//       res.json({status: 'При добавление записи произошла ошибка: ' + error});
//     }
//   );
// });
module.exports = router;