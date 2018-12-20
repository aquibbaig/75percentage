var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var studentModel = require('./models/students');
var subjectModel = require('./models/subjects')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var db = mongoose.connect('mongodb://localhost:27017/mindtree', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// create the student user
app.post('/users', function(req, res){
  console.log("User creation")
  console.log(req.body)
  let length = (req.body.subjects).length
  studentModel.findOne({username: req.body.username}, (err, user) => {
    if(err){
      console.log(err)
    }
    else if (user){
      res.sendStatus(400);
      console.log("User exists");
    }
    else{
      console.log("Up and Good");
      var newUser = new studentModel({
        username:req.body.username,
        password:req.body.password,
        subjects:req.body.subjects
      });
      newUser.save((err, savedUser) => {
        if(err){
          res.json(err);
        }
        else{
          console.log("user created!");
          res.json("Saved User");
        }
      });

      for(let i=0; i< length;i++){
        var newSubject = new subjectModel({
          subjectname:(req.body.subjects)[i]
        })
        console.log(newSubject)
        newSubject.save((err, result) => {
          if(err){
            res.json(err)
          }
          else{
            console.log("subject created")
          }
        })
      }


    }
  })
})



// verify the user
app.post('/userverify', function(req, res){
  console.log("User verification:" + req.body)
  studentModel.findOne({ $and: [ { username:req.body.username }, { password:req.body.password } ] }, (err, user) => {
    if(user){
      console.log(JSON.stringify(user))
      res.send(JSON.stringify(user))
    }
    else{
      res.sendStatus(400)
    }
  })
})

// // update subjectsList
// app.post('/users/update/:name', function(req, res){
//   console.log(req.body)
//   console.log("Trying to update")
//   var username = req.params.name
//   studentModel.findOneAndUpdate({username:username}, {$push: {subjects:req.body}}, {new:true}, (err,details)=> {
//     if (err) {
//       console.log(err)
//     }
//     else{
//       res.send(details)
//     }
//   })
// })

//get getDetails
app.get('/getDetails', function(req, res){
  subjectModel.find({}, (err, done) => {
    res.send(done)
  })
})

app.use('/', index);


// fetch subjectList for MindTree component
app.get('/subjects/:name', function(req, res) {
  var username = req.params.name
  console.log(username)
  studentModel.findOne({username:username}, function(err, result){
    if(err){
      console.log(err)
    }
    else{
      console.log(result.subjects + "here")
      res.send(result.subjects)
    }
  })
})

//tabled finally
app.get('/tabled/:hentaname', function(req, res){
  subjectModel.findOneAndUpdate({subjectname:req.params.hentaname}, {$inc: {tabled:1}}, function(err,details){
    if(err){
      console.log(err)
    }
    else{
      res.send(200)
      console.log("updated tabled entry!")
    }
  })
})

//attend finally
app.get('/attend/:hentaname', function(req, res){
  subjectModel.findOneAndUpdate({subjectname:req.params.hentaname}, {$inc: {attended:1}}, function(err,details){
    if(err){
      console.log(err)
    }
    else{
      res.send(200)
      console.log("updated tabled entry!")
    }
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
