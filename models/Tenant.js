const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    //properties of the tenant model
    name: { type: String, required: true},
    email: {type: String, required: true},
    status: { type: String, enum: ['occupied', 'vacant'], default: 'occupied'},
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;