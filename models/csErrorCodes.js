var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CSErrorCodeSchema = new Schema({
    responseMessage: {
        type: String,
        required: true
    },
    merchantID: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("CSErrorCode", CSErrorCodeSchema);