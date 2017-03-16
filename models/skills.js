'use strict';

const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const  SkillsSchema = new Schema({
  Frontend: [{HTML: {
              type: Number,
              required: [true, 'Укажите значение']
            },
            CSS: {
              type: Number,
              required: [true, 'Укажите значение']
            },
            JavaScript: {
              type: Number,
              required: [true, 'Укажите значение']
  }}],
  Workflow: [{Git: {
              type: Number,
              required: [true, 'Укажите значение']
            },
            Gulp: {
              type: Number,
              required: [true, 'Укажите значение']
            },
            Bower: {
              type: Number,
              required: [true, 'Укажите значение']
  }}],
  Backend: [{PHP: {
              type: Number,
              required: [true, 'Укажите значение']
            },
            Nodejs: {
              type: Number,
              required: [true, 'Укажите значение']
            },
            Mongodb: {
              type: Number,
              required: [true, 'Укажите значение']
  }}]
});


//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('skill', SkillsSchema);