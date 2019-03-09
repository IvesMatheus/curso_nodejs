var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Adiciona body-parser no express e faz trativa pra entender JSON
app.use(bodyParser.urlencoded({extend: true}));

consign()
	.include('app/routes')
	.then('config/dbConnection.js')
	.then('app/models')
	.into(app);

module.exports = app;
