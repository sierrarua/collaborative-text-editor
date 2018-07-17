import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

if (!process.env.MONGODB_URI) {
  console.log('MONGODB_URI ')
  process.exit(1);
}

const connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const UserSchema = new Schema({
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

const DocumentSchema = new Schema({
  content : {
    type: Array,
    default: []
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: "users"
  },
  collaboratorList: {
    type: [{
      type: ObjectId,
      ref: "users"
    }],
    default: [],
  },
  title: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdTime: {
    type: Date
  },
  lastEditTime: {
    type: Date
  },
},
  {
    minimize: false
  }
);

const User = mongoose.model('User', UserSchema);
const Document = mongoose.model('Document', DocumentSchema);

export {
  User,
  Document,
};
