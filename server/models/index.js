import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI)

export const User = mongoose.model('HOCUser', {
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
})

export const Doc = mongoose.model('HOCDoc', {
  owner: {
    ref: 'HOCUser',
    type: mongoose.Schema.ObjectId
  },
  collaborators: [{
    ref: 'HOCUser',
    type: mongoose.Schema.ObjectId
  }],
  name: String,
  rawState: String,
  shareURI: String,
  createDate: Date,
  lastSaved: Date,
})
