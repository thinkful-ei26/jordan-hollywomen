const mongoose = require ('mongoose');

const historySchema = new mongoose.Schema({
    searchTerm: { type: String, required: true },
    searchDate : { type: Date, default: Date.now }
})

historySchema.set('toJSON', {
    virtuals: true,     // include built-in virtual `id`
    transform: (doc, ret) => {
      delete ret._id; // delete `_id`
      delete ret.__v; //delete _v
    }
  });
  
  const History = mongoose.model('History', historySchema, 'history'); 
  
  module.exports = History;