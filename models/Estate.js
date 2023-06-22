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
  waterRate: {
    type: Number,
    required: true,
  },
  electricityRate: {
    type: Number,
    required: true,
  },
  paybill: {
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

estateSchema.virtual('vacancies', {
  ref: 'House',
  localField: 'houses',
  foreignField: '_id',
  justOne: false,
  match: { status: 'vacant' },
});

estateSchema.virtual('totalUnits').get(function() {
  return this.houses.length;
});

const Estate = mongoose.model('Estate', estateSchema);

module.exports = Estate;