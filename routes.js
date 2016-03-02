var express = require('express');
var router = express.Router();
var remedyController = require('./controllers/remedyController.js');
var ticketController = require('./controllers/ticketController.js');
var outageController = require('./controllers/outageController.js');
var excelController = require('./controllers/excelController.js');
var metricsController = require('./controllers/metricsController.js');
var taskController = require('./controllers/taskController.js');
var teamController = require('./controllers/teamController.js');
var mailController = require('./controllers/mailController.js');


module.exports = function(io) {                

    router.get('/', function(req, res) {    
        res.send('Birds are freee!!'); 
    });

    router.get('/getRemedyTrend', remedyController.getRemedyTrend);
    router.get('/getTicketTrend', ticketController.getTicketTrend);
    router.post('/addTicketTrend', ticketController.addTicketTrend);
    router.post('/updateTicketStatus', ticketController.updateTicketStatus);
        
    router.post('/addTask', taskController.addTask);
    router.get('/getTasks', taskController.getTasks);
    router.get('/getTask/:id', taskController.getTask);
    router.put('/updateTaskStatus/:id', taskController.updateTaskStatus);
    router.delete('/deleteTask/:id', taskController.deleteTask);        
    
    router.post('/addMember', teamController.addMember);
    router.get('/getTeamMembers', teamController.getTeamMembers);
    router.delete('/deleteTeamMember/:id', teamController.deleteTeamMember);
    
    router.post('/addOutageTrend', outageController.addOutageTrend);
    router.get('/getFirstThreeOutages', outageController.getFirstThreeOutages);
    router.get('/getOutages', outageController.getOutages);
    router.delete('/deleteOutage', outageController.deleteOutage);
    
    router.get('/ACHDecline/:date', excelController.ACHDecline);
    router.get('/onlineOrders/:startDate/:endDate', excelController.onlineOrder);
    router.get('/serviceRequest/:startDate/:endDate', excelController.serviceRequests);
    router.get('/SMB/:bus', excelController.SMB);    
    
    router.get('/reportProblemStats', metricsController.reportProblemStats);
    router.get('/wmOrderStats', metricsController.wmOrderStats);
    router.get('/scheduledPaymentStats', metricsController.scheduledPaymentStats);
    router.get('/transNotifyStats', metricsController.transNotifyStats);
    router.get('/ivrFileWithoutFileStatusStats', metricsController.ivrFileWithoutFileStatusStats);
    router.get('/ivrFileWithoutFileNameStats', metricsController.ivrFileWithoutFileNameStats);
    router.get('/CSErrorCodes', metricsController.CSErrorCodes);
    
    router.post('/sendRequest', mailController.sendRequest);
        
    return router;
};
