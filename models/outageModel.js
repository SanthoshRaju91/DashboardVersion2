var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OutageSchema = new Schema({
    issue: {
        type: String,
        required: true
    }, 
    description: {
      type: String,
        required: true
    },
    endSystem: {
        type: String,
        required: true
    }, 
    reportedDate: {
        type: Date,
        required: true
    },
    criticality: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Outage', OutageSchema);