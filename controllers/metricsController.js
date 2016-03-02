var oracle = require('oracledb'); 
var nodeExcel=require('excel-export');
var config = require('../config.js');
var logger = require('../utils/loggerUtil.js').logger;
var Cache = require('../utils/cacheUtil.js');

var ReportProblem = require('../models/reportProblem.js');
var WMOrder = require('../models/wmOrder.js');
var SchedulePayments = require('../models/schedulePayments.js');
var TransNotify = require('../models/transNotifyStats.js');
var CSErrorCode = require('../models/csErrorCodes.js');

module.exports.reportProblemStats = function(req, res) {
    logger.info("In Report-Problem stats module");
    ReportProblem.find({}, function(err, result) {
       if(err)  {
           logger.error("Error ins fetching data for report problem " + err);
           res.json({status: 500, success: false, message: "Error in fetching data"});           
       } else if(!result) {
           logger.error("No records found for report problem");
           res.json({status: 404, success: false, message: "No records found"});
       } else {
           logger.info("Data for Report Problem fetched successfully");
           res.json({status: 200, success: true, result: JSON.stringify(result)});
       }
    }); 
}


module.exports.wmOrderStats = function(req, res) {    
    logger.info("In WM-Order stats module");
    WMOrder.find({}, function(err, result) {
        if(err)  {
           logger.error("Error ins fetching data for WM order " + err);
           res.json({status: 500, success: false, message: "Error in fetching data"});           
       } else if(!result) {
           logger.error("No records found for WM order");
           res.json({status: 404, success: false, message: "No records found"});
       } else {
           logger.info("Data for WM order fetched successfully");
           res.json({status: 200, success: true, result: JSON.stringify(result)});
       }
    });
}


module.exports.scheduledPaymentStats = function(req, res) {
    logger.info("In Scheduled Payment stats module");
    SchedulePayments.find({}, function(err, result) {
        if(err)  {
           logger.error("Error ins fetching data for Scheduled Payments " + err);
           res.json({status: 500, success: false, message: "Error in fetching data"});           
       } else if(!result) {
           logger.error("No records found for Scheduled Payments");
           res.json({status: 404, success: false, message: "No records found"});
       } else {
           logger.info("Data for Scheduled Payments fetched successfully");
           res.json({status: 200, success: true, result: JSON.stringify(result)});
       }
    });
}

module.exports.transNotifyStats = function(req, res) {
    logger.info("In Trans Notify stats module");
    TransNotify.find({}, function(err, result) {
        if(err)  {
           logger.error("Error ins fetching data for Trans Notify " + err);
           res.json({status: 500, success: false, message: "Error in fetching data"});           
       } else if(!result) {
           logger.error("No records found for Trans Notify");
           res.json({status: 404, success: false, message: "No records found"});
       } else {
           logger.info("Data for Trans Notify fetched successfully");
           res.json({status: 200, success: true, result: JSON.stringify(result)});
       }
    });
}

module.exports.CSErrorCodes = function(req, res) {
    logger.info("In Cyber Source Error Codes module");
    CSErrorCode.find({}, function(err, result) {
        if(err)  {
           logger.error("Error ins fetching data for Trans Notify " + err);
           res.json({status: 500, success: false, message: "Error in fetching data"});           
       } else if(!result) {
           logger.error("No records found for Trans Notify");
           res.json({status: 404, success: false, message: "No records found"});
       } else {
           logger.info("Data for Trans Notify fetched successfully");
           res.json({status: 200, success: true, result: JSON.stringify(result)});
       }
    });
}

module.exports.ivrFileWithoutFileStatusStats = function(req, res) {
    logger.info("In IVR File Without File Status stats module");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('Error IVR File Without File Status stats module ' + err);
				console.log("Error: " + err);
				throw err;
			} else {
				connection.execute("select IVR.IVR_FILE_NAME, IVR.IVR_FILE_ID, IVR.BP_STATUS, IVR.FILE_STATUS, IVR.AUDIT_CREATE_DT from CSS_ADMIN.PAY_INVOICE_IVR_FILE ivr where IVR.FILE_STATUS is null  order by IVR.AUDIT_MODIFY_DT desc", {}, function(err1, result) {
					if(err1) {
                        logger.error("Error in IVR File Without File Status stats module query " + err1);
						console.log("Error in executing query : " + err1);
						res.json({status: 500, message: 'Error occured!!'});
					} else {																			
						logger.info("Record fetched from DB for IVR File Without File Status stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.ivrFileName = result.rows[i][0];
                            resultObj.ivrFileId = result.rows[i][1];
                            resultObj.ivrBPStatus = result.rows[i][2];
                            resultObj.ivrFileStatus = result.rows[i][3];
                            resultObj.ivrAuditCreateDate = result.rows[i][4];
                            resultArray.push(resultObj);                            
                        }
                        res.json({status: 200, result: JSON.stringify(resultArray)});
					}				
				});
			}	
		});
}


module.exports.ivrFileWithoutFileNameStats = function(req, res) {
    logger.info("In IVR File Without File Name stats module");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('Error IVR File Without File Name stats module ' + err);
				console.log("Error: " + err);
				throw err;
			} else {
				connection.execute("SELECT IVR_FILE_NAME, IVR_FILE_ID, BP_STATUS, FILE_STATUS, AUDIT_CREATE_DT FROM PAY_INVOICE_IVR_FILE WHERE IVR_FILE_NAME IS NULL AND AUDIT_CREATE_DT >=SYSDATE-15 order by AUDIT_MODIFY_DT desc", {}, function(err1, result) {
					if(err1) {
                        logger.error("Error in IVR File Without File Name stats module query " + err1);
						console.log("Error in executing query : " + err1);
						res.json({status: 500, message: 'Error occured!!'});
					} else {																			
						logger.info("Record fetched from DB for IVR File Without File Name stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.ivrFileName = result.rows[i][0];
                            resultObj.ivrFileId = result.rows[i][1];
                            resultObj.ivrBPStatus = result.rows[i][2];
                            resultObj.ivrFileStatus = result.rows[i][3];
                            resultObj.ivrAuditCreateDate = result.rows[i][4];
                            resultArray.push(resultObj);                            
                        }
                        res.json({status: 200, result: JSON.stringify(resultArray)});
					}				
				});
			}	
		});
}