const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const authorize = require('./middlewares/auth')

//require('dotenv').config();
/*
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}**/

app.use(cors());
/*
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
*/

app.use(authorize);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.disable('etag'); //Disable Request Cache
app.use(bodyParser.json());



app.get('/api/public', function(req, res) {
  res.json({
    message: "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});


app.get('/api/private', authorize, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.use('/user',require('./controllers/user'));
app.use('/pages',require('./controllers/pages'));

app.listen(3001);
console.log('Listening on http://localhost:3001');


mongoose.connect("mongodb://127.0.0.1/nema",{
    server:{
        poolSize: 10
    }
});

mongoose.connection.on('error',(err)=>
{
    console.error("Database Connection Error: " + err);
    process.exit(2);
});


mongoose.connection.on('connected',()=>
{
    console.info("Succesfully connected to MongoDB Database");
});
