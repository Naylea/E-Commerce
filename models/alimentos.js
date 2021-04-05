const mongoose = require('mongoose');

const schema3 = new mongoose.Schema({
  alimento: { type: String },
  cal:  {type : Number},
  carbs: { type: Number },
  grasa: { type: Number },
  proteina: { type: Number },
  precio: { type: Number }
});



const alimentos = mongoose.model('alimentos', schema3);

module.exports = alimentos;
