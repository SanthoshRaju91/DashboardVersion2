var Ticket = require('../models/ticketModel.js');
var logger = require('../utils/loggerUtil.js').logger;
var Cache = require('../utils/cacheUtil.js');

exports.getTicketTrend = function(req, res) {    
    Ticket.find({}, function(err, ticket) {
        if(err) {
            logger.error("Error in fetching ticket result: " + err);
            res.json({status: 500, message: 'Error'});  
        } else if(!ticket) {
            logger.error('No results found');
            res.json({status: 404, message: 'No results found'});
        } else {
            logger.info('Results found and sent, setting into cache for the first time access');    
            Cache.setCache('ticketTrend', ticket, logger);
            res.json({status: 200, result: ticket});
        }
   });
}

exports.addTicketTrend = function(req, res) {    
    Ticket.remove({}, function(err) {
        if(err) {
            logger.error("Error in adding the new ticket trend " + err);
            res.json({status: 500, message: "Error"});
        } else {
            var ticket = new Ticket({totalPending: req.body.totalPending, totalHigh: req.body.totalHigh, totalMedium: req.body.totalMedium, totalLow: req.body.totalLow});

            ticket.save(function(err) {
               if(err) {
                    logger.error("Error in inserting  " + err);
                    res.json({status: 500, message: 'Error in inserting'});
                } else {
                    logger.info("Inserted successfully");
                    res.json({status: 200, message: 'Inserted successfully'});
                }        
            });
        }
    });
}


exports.updateTicketStatus = function(req, res) {
    Ticket.update({}, {totalPending: req.body.totalPending, totalHigh: req.body.totalHigh, totalMedium: req.body.totalMedium, totalLow: req.body.totalLow}, function(err) {
        if(err) {
            logger.error("Error in updating ticket status" + err);
            res.json({status: 500, success: false, message: "Erron in updating ticket status"});
        } else {
            logger.info("Ticket status updated successfully");
            res.json({status: 200, success: true, message: "Updated successfully!"});
        }
    });
}