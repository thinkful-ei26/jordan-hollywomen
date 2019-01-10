const mongoose = require ('mongoose');

const historySchema = new mongoose.Schema({
    query: { type: String, required: true },
    time : { type: Date, default: Date.now }
})

historySchema.set('toJSON', {
    virtuals: true,     // include built-in virtual `id`
    transform: (doc, ret) => {
      delete ret._id; // delete `_id`
      delete ret.__v; //delete _v
    }
  });
  
  const History = mongoose.model('History', historySchema); 
  
  module.exports = History;