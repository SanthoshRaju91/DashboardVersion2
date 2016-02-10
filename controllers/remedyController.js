var Remedy = require('../models/remedyModel.js');
var logger = require('../utils/loggerUtil.js').logger;

exports.getRemedyTrend = function(req, res) {
  Remedy.find({}, function(err, remedy) {
      if(err){
        logger.error("Error in retrieving the data " + err);  
          res.json({status: 500, message: "Error in application"});
      } else {
          logger.info("Details fetched for RemedyTrend");
          res.json({status: 200, remedy: remedy});
      }
  })  
};
