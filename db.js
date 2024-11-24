const mongoose = require('mongoose');
//this is the line code for the connection to my mongodb
const mongoURI = 'mongodb+srv://jordyalec:Jordytheboss1@cluster0.l4n3i.mongodb.net/'; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
