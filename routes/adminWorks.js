const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');
const smtpTransport = require('nodemailer-smtp-transport');

router.get('/', function(req, res) {
    let obj = {
    title: 'Страница "Мои работы"',    
  	};  
    if(req.session.isAdmin){
       res.render('pages/admin', obj);
    }
    else{
       res.send('У вас нет прав доступа');
    }   
});

module.exports = router;