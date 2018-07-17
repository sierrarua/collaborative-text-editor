<<<<<<< HEAD
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
=======
var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=mongoose.Schema.Types.ObjectId
>>>>>>> 5cbdf85715f6dd6628183e4a5aaedbe0334366a2

if (!process.env.MLAB) {
  process.exit(1);
}

<<<<<<< HEAD
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
=======
var connect = process.env.MLAB;
mongoose.connect(connect);

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

var documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  collaborators: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User: User,
  Document: Document
>>>>>>> 5cbdf85715f6dd6628183e4a5aaedbe0334366a2
};
