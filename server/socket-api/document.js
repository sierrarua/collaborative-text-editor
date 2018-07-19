import {Doc} from '../models'

export default function document(socket) {
  socket.on('getDocuments', (data, next) => {
    Doc.find({
      collaborators: {$in: socket._activeUser.id}
    }, (err, docs) => next({err, docs}))
  })

  socket.on('addDocumentCollaborator', (data, next) => {
    Doc.findOne({
      _id: data.docId,
    }, (err, docs) => {
      if(err) return next({err, docs})

      docs.collaborators.push(socket._activeUser)
      docs.save((err) => {
        next({err, docs})
      })
    })
  })

  socket.on('createDocument', (data, next) => {
    new Doc({
      owner: socket._activeUser.id,
      collaborators: [socket._activeUser.id],
      createDate: Date.now(),
      name: data.name
    }).save((err, doc) => next({err, doc}))
  })

  socket.on('saveDocument', (data, next) => {
    Doc.findOne({
      _id: data.docId,
    }, (err, doc) => {
      if(err) return next({err})
      doc.rawState = data.rawState
      doc.save((err) => next({err}))
    })
  })

  socket.on('openDocument', (data, next) => {
    socket.join(data.docId)

    Doc.findOne({
      _id: data.docId,
    }, (err, doc) => next({err, doc}))
  })

  socket.on('syncDocument', (data, next) => {
    socket.to(data.docId).emit('syncDocument', data)
  })

  socket.on('closeDocument', (data, next) => {
    // TODO: think about saving at this point?
    socket.leave(data.docId)
    next({err: null})
  })

  socket.on('deleteDocument', (data, next) => {
    Doc.deleteOne({
      _id: data.docId,
      owner: socket._activeUser.id,
    }, (err) => next({err}))
  })
}
