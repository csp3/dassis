import express from 'express';
import consign from 'consign';

const app = express();

var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

consign({
	cwd: __dirname
})
.include('libs/config.js')
.then('db.js')
.then('libs/middlewares.js')
.then('routes')
.then('libs/boot.js') 
.into(app)
 