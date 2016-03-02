var CronJob = require('cron').CronJob;
var logger = require('../utils/loggerUtil.js').logger;
/*var Sync = require('sync');*/
var async = require('async');
var job = require('./updateJob.js');

new CronJob('* * * * * *', function() {
    logger.info("Control Job started executing");
    async.series([job.reportProblem, job.wmOrders]);
}, null, true, '');

/*
(function() {
        var job = require('./updateJob.js');
        
        job.reportProblem();
        job.wmOrders();
        job.transNotify();
        job.schedulePayments(); 
        job.CSErrorCodes();
    }());
*/


/*
    Sync(function() {        
        job.reportProblem.sync(null);                   
        job.wmOrders.sync(null);
        job.transNotify.sync(null);
        job.schedulePayments.sync(null); 
        job.CSErrorCodes.sync(null);    
    });    */