const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n',(err) =>{
    if (err) {
        console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next)=> {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.use('/images',express.static(__dirname + '/images'));

hbs.registerHelper('currentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
  return text.toUpperCase();
});

//Register handler to route for http request (here: '/')
app.get('/',(req,res) => {
  //res.send('<H1>Hello Express!<H1>')
  res.render('home.hbs',{
    message: 'Welcome',
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    message: 'Welcome to Projects.',
    pageTitle: 'Project Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/temp',(req,res) => {
  res.render('temp.hbs',{
    message: 'Welcome to Projects.',
    pageTitle: 'Project Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/temp',(req,res) => {
  res.render('temp.hbs');
});

app.get('/yearShow',(req,res) => {
  res.render('yearShow.hbs');
});

app.get('/bad',(req,res) => {
  res.send({
      errorMessage: 'Error Handling Request',
  });
});

app.listen(port, () =>{
  console.log(`Server it up on port 3000`);
});
