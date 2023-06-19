const mongoose = require('mongoose');

const estateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  houses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'House',
    },
  ],
});

const Estate = mongoose.model('Estate', estateSchema);

module.exports = Estate;