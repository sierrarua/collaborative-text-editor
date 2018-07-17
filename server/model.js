import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

if (!process.env.MONGODB_URI) {
  process.exit(1);
}

const connect = process.env.MONGODB_URI;
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
  docLists: {
    type: Array,
    default: [],
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
  // {
  //   minimize:false
  // }
});

const User = mongoose.model('User', userSchema);
const Document = mongoose.model('Document', documentSchema);

export {
  User,
  Document,
};
