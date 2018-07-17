import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { User, Document } from './model';

const server = require('http').Server(app);
const io = require('socket.io')(server);
const session = require('cookie-session');

const app = express();
const connect = process.env.MLAB;
mongoose.connect(connect);

// const Document = models.Document;
const LocalStrategy = require('passport-local').Strategy;


// set passport middleware to first try local strategy
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// passport strategy
passport.use(new LocalStrategy((username, password, done) => {
  // Find the user with the given username
  User.findOne({ username: username }, (err, user) => {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    if (!user) {
      console.log(user);
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, user);
  });
}));

// connect passport to express via express middleware
app.use(passport.initialize());
app.use(passport.session());


app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,

  });
  newUser.save({}, (error, results) => {
    if (error) {
      console.log('error', error);
    } else {
      res.send(results);
    }
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('LOGIN: ', req.user)
  res.json({ success: true });
});

app.post('/newDoc', (req, res) => {
  const newDoc = new Document({
    title: req.body.title,
    password: req.body.password
  });
  newDoc.save({}, (error, results) => {
    if (error) {
      console.log('error', error);
    } else {
      res.send(results);
    }
  });
});

app.post('/doc', (req, res) => {


});

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
