var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduledPaymentSchema = new Schema({
    day: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ScheduledPayment", ScheduledPaymentSchema);