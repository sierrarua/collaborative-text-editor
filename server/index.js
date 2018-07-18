// import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { User, Document } from './model';


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const session = require('cookie-session');


const connect = process.env.MONGODB_URI;
mongoose.connect(connect);

// const Document = models.Document;
const LocalStrategy = require('passport-local').Strategy;
console.log('localstrateg');

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

passport.use(new LocalStrategy((username, password, done) => {
  // Find the user with the given username
  User.findOne({ username }, (err, user) => {
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

app.get('/', (req, res) => {
  res.json({ success: true });
})

app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,

  });
  newUser.save({}, (error, results) => {
    if (error) {
      console.log('error', error);
      res.json({ error });
    } else {
      res.send(results);
    }
  });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('LOGIN: ', req.user.username);
  res.json({ success: true });
});

app.post('/newDoc/:userid', (req, res) => {
  const newDoc = new Document({
    owner: req.params.userid,
    title: req.body.title,
    password: req.body.password,
    collaboratorList: [req.params.userid],
    createdTime: Date.now(),
  });
  newDoc.save({}, (error) => {
    if (error) {
      console.log('error', error);
    } else {
      User.findById(req.params.userid)
      .then((user) => {
        user.docLists.push(newDoc);
        user.save();
        console.log(user);
        res.json({ success: true });
      })
      .catch((err) => {
        console.log('ERROR in loading a doc: ', err)
        res.json({ success: false })
      })
    }
  });
});



app.get('/doc', (req, res) => {
Document.findById(req.body.id)

})


server.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
