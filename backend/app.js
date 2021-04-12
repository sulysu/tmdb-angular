var path = require('path');
var express = require('express');
var cors = require('cors');
var app = express();
 
const port = 8080;

app.use(cors());

app.use(express.static(path.join(__dirname,'dist/frontend')));

const search = require('./routes/search.js');
app.use('/search',search)

const movie = require('./routes/movie.js');
app.use('/movie', movie);

const tv = require('./routes/tv.js');
app.use('/tv', tv);

const person = require('./routes/person.js');
app.use('/person',person)

const social = require('./routes/social.js');
app.use('/social',social);


app.use('/*', function(req, res){
  res.sendFile(path.join(__dirname+'/dist/frontend/index.html'));
})

app.listen(port, () =>{
  console.log(`example app listening at http://localhost:${port}`);
})