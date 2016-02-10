var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var remedySchema = new Schema({
    month: {
        type: String,
        required: true
    },
    opened: {
        type: Number,
        required: true
    },
    resolved: {
        type: Number,
        required: true
    },
    pending: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Remedy", remedySchema);