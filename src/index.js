const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const {database} = require('./keys');

//inicializaciones
const app = express();
require('./lib/passport');

//configuraciones
app.set('port', process.env.PORT || 4000);
app.set ('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'Layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');
app.disable('etag');

//funciones de peticiones(Middelewares)
app.use(session({
    secret: 'primeraprueba',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.danger = req.flash('danger');
    app.locals.info = req.flash('info');
    app.locals.user = req.user;
    next();
})

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use('/links',require('./routes/links'));

//Publico
app.use(express.static(path.join(__dirname, 'public')))

//Ejecutar el servidor
app.listen(app.get('port'), () => {
    console.log('servidor en puerto', app.get('port'))
})