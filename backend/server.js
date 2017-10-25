const express = require('express');
const path = require('path');
// const api = require('./routes');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('build'));

app.use(bodyParser.urlencoded({extended: false }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
  next();
});

app.use(express.static(path.join(__dirname, 'public')))

// app.use('/api', api);

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
})


app.listen(3000, () => {
	console.log('Listening on port 3000 captain!')
});