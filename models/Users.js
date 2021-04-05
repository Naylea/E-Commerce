const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');//

const schema2 = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  nombre: {type: String},
  direccion: {type: String}
});

//Recibe la contraseña y se la da al modulo de BCRYPT-NODEJS Y NOS RETORNA LO QUE ESTA CIFRANDO 
schema2.methods.encryptPassword =  (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(2)); //hashSync recibe la contraseña y gentSaltSync cifra la contraseña x cantidad de veces
}

//compara la contraseña introducida por el usuario y returna un true o false
schema2.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Users = mongoose.model('Users', schema2);

module.exports = Users;