const mongoose = require('../lib/db.js');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  uid: String,
  createdAt: Date,
  text: String,
  uip: String
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
