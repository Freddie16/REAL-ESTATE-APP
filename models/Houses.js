const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({

    estate: { type: mongoose.Schema.Types.ObjectId, ref: 'Estate', required: true },
    houseNumber: { type: String, required: true },
    numberOfBedrooms: { type: Number, required: true},
    rent: {type: Number, required: true},
    status: { type: String, enum: ['vacant', 'occupied'], default: 'vacant'},
});

const House = mongoose.model('House', houseSchema);

module.exports = House;