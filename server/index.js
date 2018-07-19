import http from 'http'
import express from 'express'
import socketIO from 'socket.io'
import {auth, document} from './socket-api'
import routes from './routes'

const app = express()
const server = http.Server(app)
const io = socketIO(server)

io.on('connection', function (socket) {
  document(socket)
  auth(socket)
})

app.use(routes)
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
;

server.listen(1337, '127.0.0.1');

server.listen(process.env.PORT || 1337)
