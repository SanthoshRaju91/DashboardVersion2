var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WMOrdersSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("WMOrders", WMOrdersSchema);