const express = require('express');
const request = require('request');
const connection = require('./db');
const cors = require('cors');


const app = express();
app.listen(process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(cors());
require('../server/routes.js')(app, express);


