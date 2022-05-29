const express = require('express');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const user = require('./routes/user');
const survey = require('./routes/survey');
const postGameSurvey = require('./routes/postGameSurvey');
//Nos permite manejar peticiones y enviar respuesta en formato json
app.use(bodyParser.json());
//De esta manera indicamos que no vamos a recibir peticiones enviadas directamente de un formulario, sino que sera todo enviado en json
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', user);
app.use('/survey', survey);
app.use('/postGameSurvey', postGameSurvey);
app.use('/', indexRouter);

module.exports = app