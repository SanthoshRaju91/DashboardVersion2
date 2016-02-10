var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
    totalPending: {
        type: Number,
        default: 0,
        required: true
    },
    totalHigh: {
        type: Number,
        default: 0,
        required: true
    }, 
    totalMedium: {
        type: Number,
        default: 0,
        required: true
    },
    totalLow: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);