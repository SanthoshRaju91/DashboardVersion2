var Outage = require('../models/outageModel.js');
var logger = require('../utils/loggerUtil.js').logger;
var Cache = require('../utils/cacheUtil.js');

exports.addOutageTrend = function(req, res) {
    logger.info("Inside addOutage controller");
    var outage = new Outage({issue: req.body.issue, description: req.body.description, endSystem: req.body.endSystem, reportedDate: req.body.reportedDate, criticality: req.body.criticality});
    
    outage.save(function(err){
       if(err) {
           logger.error("Error while saving the otage " + err);
           res.json({status: 500, success: false, message: 'Error in saving'});
       } else {
           logger.info("Otage saved successfully");
           res.json({status: 200, success: true, message: 'Outage saved'});
       }
    });
};

exports.getFirstThreeOutages = function(req, res) {
    Outage.find({}).limit(3).sort({reportedDate: -1}).exec(function(err, outages) {
       if(err) {
           logger.error("Error in fetching the Outage " + err);
           res.json({status: 500, success: false, message: "Error in fetching outage details"});
       } else if(!outages) {
           logger.error("No Outages found");
           res.json({status: 404, success: true, result: ''});
       } else {
           logger.info("Outage data fetched from DB");
           res.json({status: 200, success: true, result: outages});
       }
    });
};

exports.getOutages = function(req, res) {
  Outage.find({}, function(err, result) {
      if(err) {
            logger.error("Error while getting the datat from mongoDB " + err);
            res.json({status: 500, message: 'Error while getting data from mongoDB'});
          } else if(!result) {
            logger.error("No data in mongoDB");
            res.json({status: 404, message: 'No data in mongoDB'});
        } else {
            logger.info("Data retrieved");              
            res.json({status: 200, result: result});
        }
      });
};

exports.deleteOutage = function(req, res) {
    Outage.remove({_id: req.params.id}, function(err) {
       if(err) {
           logger.error("Error in deleting the outage " + err);
           res.json({status: 500, success: false, message: "Could not delete Outage"});
       } else {
           logger.info("Outage has been deleted!");
           res.json({status: 200, success: true, message: "Outage has been deleted"});
       }
    });
}


