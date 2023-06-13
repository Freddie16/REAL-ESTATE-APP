const mongoose = require('mongoose');


const rentSchema = new mongoose.Schema({
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true},
    tenant: {type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true},
    amount: {type: Number, required: true},
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;