const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    name: String,
    email: String,
    plan: String,
    phone: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Membership', MembershipSchema);

