var Team = require('../models/teamModel.js');
var logger = require('../utils/loggerUtil.js').logger;

exports.addMember = function(req, res) {
    var member = new Team({name: req.body.name, emailAddress: req.body.emailAddress, role: req.body.role});
    member.save(function(err) {
       if(err) {
           logger.error("Error in adding team member " + err);
           res.json({status: 500, success: false, message: 'Error in addign team member'});
       } else {
           logger.info("Team member added successfully");
           res.json({status: 200, success: true, message: 'Team member added successfully'});
       }
    });
}

exports.getTeamMembers = function(req, res) {
    Team.find({}, function(err, members) {
        if(err) {
            logger.error("Error in fetching team members " + err);
            res.json({status: 500, success: false, message: 'Error in fetching members'});
        } else if (!members) {
            logger.error("No members availabe to fetch");
            res.json({status: 404, success: true, result: ''});
        } else {
            logger.info("Finished fetching team members data");
            res.json({status: 200, success: true, result: members});
        }
    })
}

exports.deleteTeamMember = function(req, res) {
    Team.remove({_id: req.params.id}, function(err) {
       if(err) {
           logger.error("Error in deleting team member " +err);
           res.json({status: 500, success: false, message: 'Error in deleting team member'});
       } else {
           logger.info("Team member deleted successfully");
           res.json({status: 200, success: true, message: 'Member removed successfully'});
       }
    });
}