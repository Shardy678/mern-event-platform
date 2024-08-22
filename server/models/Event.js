const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

module.exports = mongoose.model('Event', eventSchema);
