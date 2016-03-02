var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportProblemSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ReportProblem", ReportProblemSchema);