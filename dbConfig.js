const mongoose = require('mongoose');

const MONGO_URL = `mongodb://${process.env.MONGODB_SERVER || 'localhost'}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;

const mongoOptions = {
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = () => mongoose.connect(MONGO_URL, mongoOptions);

module.exports = connectDb;