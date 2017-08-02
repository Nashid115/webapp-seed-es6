import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import pg from 'pg';
import apiRouter from './app.router.js';
// import mongoose from 'mongoose';

var mongoose = require('mongoose');
let app = express();

let Customer = require('./models/customer');

//connect to mongodb
mongoose.connect('mongodb://localhost/ewallet', { useMongoClient: true });
var db = mongoose.connection;
var postdb=pg.connect;
//on connection
db.on('connected', () => {
	console.log("connected to mongodb @8080");
});

//on error
db.on('error', (err) => {
	if (err) {
		console.log("error in connection", +err);
	}
});

app.set('port', process.env.PORT || 8080);
app.use(cors());

app.use(express.static('./client/starter-app/dist'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/starter-app/dist', 'index.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
	console.log('Express server listening at http://localhost:' + app.get('port'));
});
