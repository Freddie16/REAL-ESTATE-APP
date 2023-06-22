const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  houseNumber: { 
    type: String,
     required: true 
  },
  bedrooms: {
     type: Number, 
     required: true 
    },
  status: {
    type: String,
    enum: ['vacant', 'occupied'],
    default: 'vacant',
  },
  
  estate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estate',
    required: true,
  },
  rent: {
     type: Number, 
     required: true 
  },

});




const House = mongoose.model('House', houseSchema);

module.exports = House;