var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransNotifySchema = new Schema({
    day: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("TransNotify", TransNotifySchema);