const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const config = require('../config.json');
const smtpTransport = require('nodemailer-smtp-transport');

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

router.post('/', (req, res) => {
  //требуем наличия имени, обратной почты и текста
  if (!req.body.name || !req.body.email || !req.body.text) {
  	console.log(req.body);
    //если что-либо не указано - сообщаем об этом
    return res.json({status: 'Укажите данные!'});
  }
  //инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
      user: config.mail.user,
      pass: config.mail.pass
    }
  }));

  const mailOptions = {
    from: req.body.email,
    to: config.mail.user,
    subject: config.mail.subject,
    text: `${req.body.name} 

    		${req.body.email}

    		${req.body.text.trim().slice(0, 500)}`
  };

  //отправляем почту
  transporter.sendMail(mailOptions, function (error, info) {
    //если есть ошибки при отправке - сообщаем об этом
    console.log(req.body);
    console.log('otpravili pismo');
    if (error) {
      return res.json({status: 'При отправке письма произошла ошибка'});
    }
    res.json({status: 'Письмо успешно отправлено'});
  });
});
module.exports = router;