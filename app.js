require('dotenv').config()
require('./passport/local-auth');
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan'); //Morgan para ver las peticiones http que llegan al servidor
const passport = require('passport'); //passport permite hacer la autentificacion y validacion 
var flash = require('req-flash'); //nos permite enviar mensaje entre paginas 

//Base de datos
const connectDb = require('./dbConfig');
const Users = require('./models/Users');
const PORT = 3000;

// Configuracion de las vistas
app.set('view engine', 'pug');
app.set('views', './views');


// Intermediarios
app.use(morgan('dev'));
app.use(express.static('public'));


app.use(express.urlencoded({extended: false}));//recibir datos desde el cliente,extend:false declara que no se van a recibir datos de gran tamaño
app.use(session({
    secret: 'hola2secreto',
    resave: false,
    saveUninitialized: false
  }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  
  
//Utiliza la dependencia req-flash para enviar valores entre paginas de manera mas facil
  app.use((req,res,next) => {

    //envia un mensaje de error si algun valor en el inicio de sesion es incorrecto
    app.locals.mensajedeinicio =  req.flash('mensajedeinicio');
    //envia un mensaje de error si el correo en el registro ya está en uso
    app.locals.mensajederegistro =  req.flash('mensajeregistro');
    app.locals.user=req.user;

    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/cont', express.static(path.join(__dirname, 'cont')));

//require donde se encuentran todas las rutas
app.use('/', require('./router/index'));

connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
});