const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;//Utilizamos el metodo de autenticacion Strategy de passport-local
const User = require('../models/Users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});/////////////////////


//cuando el usuario se registra utiliza este modulo
passport.use('local-signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true //permite recibir datos request 
    
    //el modulo recibe los datos y crea un nuevo usuario
}, async (req,email, password,done) => {
    const user = await User.findOne({'email': email})

    //Verifica si el correo ya existe en la base de datos 
    if(user){
      return done(null, false, req.flash('mensajeregistro', 'El Email ya a sido registrado.'));
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.nombre=req.body.nombre;
      newUser.direccion=req.body.direccion;
      await newUser.save();
      done(null, newUser);
    }
  }));

  //autentificacion para iniciar sesion
  passport.use('local-signin', new LocalStrategy({
    
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    
  }, async (req, email, password, done) => {
    
    //proseso para ver si el usuario existe o no 
    const user = await User.findOne({email: email});//buscando un usuario por correo
    
    if(!user) {
      //si no existe se devuelve un error
      return done(null, false, req.flash('mensajedeinicio', 'El Correo no existe'));
    }
    //si el usuario existe se evalua si la contraseña no existe
    if(!user.comparePassword(password)) {
      return done(null, false, req.flash('mensajedeinicio', 'Contraseña Incorrecta'));
    }
    //si ambas son correctas
    return done(null, user);
  }));
  