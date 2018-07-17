const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

if (!process.env.MLAB) {
  process.exit(1);
}

const connect = process.env.MLAB;
mongoose.connect(connect);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const documentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  collaborators: {
    type: ObjectId,
    ref: 'User',
  },
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);

module.exports = {
  User,
  Document,
};
