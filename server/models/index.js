import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)

export const User = mongoose.model('Users', {
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
})

export const Doc = mongoose.model('Docs', {
  owner: {
    ref: 'Users',
    type: mongoose.Schema.ObjectId
  },
  collaborators: [{
    ref: 'Users',
    type: mongoose.Schema.ObjectId
  }],
  name: String,
  rawState: String,
  shareURI: String,
  createDate: Date,
  lastSaved: Date,
})
