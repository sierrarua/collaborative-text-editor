import {User} from '../models'

export default function auth(socket) {
  socket.on('login', ({username, password}, next) => {
    User.findOne({username, password}, (err, doc) => {
      // store the actively logged in user to the socket
      socket._activeUser = doc
      next({err: err, ok: !!doc})
    })
  })

  // TODO: need to ensure username/password have unique key constrains
  socket.on('register', ({name, username, password}, next) => {
    new User({name, username, password}).save((err, doc) => {
      // automatically login in user after we create them
      if(!err && doc) socket._activeUser = doc
      next({err: err, ok: !!doc})
    })
  })

  socket.on('logout', (data, next) => {
    socket._activeUser = null
    next({err: null, ok: true})
  })
}