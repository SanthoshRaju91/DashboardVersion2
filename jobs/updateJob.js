var oracle = require('oracledb'); 
var config = require('../config.js');
var logger = require('../utils/loggerUtil.js').logger;
var mongoose = require('mongoose');
var ReportProblem = require('../models/reportProblem.js');
var WMOrder = require('../models/wmOrder.js');
var SchedulePayments = require('../models/schedulePayments.js');
var TransNotify = require('../models/transNotifyStats.js');
var CSErrorCode = require('../models/csErrorCodes.js');

mongoose.connect(config.processConfig.mongoURL, function(err){
    if(err) logger.error("JOB: Error in connecting to mongo DB"); 
    else logger.info("JOB: Connected to MongoDB");
}); 

exports.reportProblem = function() {
    logger.info("JOB: In Report-Problem stats module");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('JOB: Error Report-Problem stats module JOB' + err);
				console.log("JOB Error: " + err);
				throw err;
			} else {
				connection.execute("SELECT TO_CHAR (rp.AUDIT_CREATE_DT, 'MM/YYYY') AS MTH, TO_CHAR (rp.AUDIT_CREATE_DT, 'YYYY') as YR, COUNT (*) FROM REPORT_PROBLEM rp WHERE (RP.REQUEST_TYPE = 'CONTACTUS' OR RP.REQUEST_TYPE IS NULL) AND rp.AUDIT_CREATE_DT BETWEEN ADD_MONTHS (SYSDATE, -12) AND ADD_MONTHS (SYSDATE, 0) GROUP BY TO_CHAR (rp.AUDIT_CREATE_DT, 'MM/YYYY'), TO_CHAR (rp.AUDIT_CREATE_DT, 'YYYY') ORDER BY YR", {}, function(err1, result) {
					if(err1) {
                        logger.error("JOB: Error in Report-Problem stats module query " + err1);
						console.log("JOB: Error in executing query : " + err1);						
					} else {																			
						logger.info("Record fetched from DB for Report-Problem stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.month = result.rows[i][0];
                            resultObj.count = result.rows[i][2];
                            resultArray.push(resultObj);                            
                        }                        
                         ReportProblem.remove({}, function(err2) {
                            if(err2) {
                                logger.error("JOB: Error in dropping the db details " + err2);
                                return;
                            }  else {
                                    logger.info("JOB: Old data removed");
                                    resultArray.forEach(function(result) {
                                        var reportProblem = new ReportProblem({month: result.month, count: result.count});
                                        reportProblem.save(function(err) {
                                            if(err) { logger.error("JOB: error while inserting to ReportProblem DB" + err); return; }
                                            else { logger.info("JOB: ReportProblem Data inserted successfully"); return; }
                                        });      
                                    });
                               }
                            });                            
					}				
				});
			}	
		});
};   

exports.wmOrders = function() {
    logger.info("JOB: In WM-Order stats module");    
       oracle.getConnection({
            user: config.ENV.user,
            password: config.ENV.password,
            connectString: config.ENV.connectString
        }, function(err, connection) {
            if(err) {
                logger.error('JOB: Error WM-Order stats module ' + err);
                console.log("JOB Error: " + err);
                throw err;
            } else {
                connection.execute("select CAT.CATEGORY_GROUP, count(*) from COMMERCE_ADMIN.BLC_ORDER ord join COMMERCE_ADMIN.BLC_ORDER_ITEM oi on OI.ORDER_ID=ORD.ORDER_ID join COMMERCE_ADMIN.WM_CATEGORY cat on CAT.CATEGORY_ID=OI.CATEGORY_ID where trunc(ORD.DATE_CREATED) > sysdate-10 group by CAT.CATEGORY_GROUP", {}, function(err1, result) {
                    if(err1) {
                        logger.error("JOB: Error in WM-Order stats module query " + err1);
                        console.log("JOB: Error in executing query : " + err1);
                    } else {																			
                        logger.info("JOB: Record fetched from DB for WM-Order stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.category = result.rows[i][0];
                            resultObj.count = result.rows[i][1];
                            resultArray.push(resultObj);                            
                        }
                        WMOrder.remove({}, function(err2) {
                            if(err2) {
                                logger.error("JOB: Error in dropping the Order document " + err2);
                                return;
                            } else {
                                logger.info("JOB: Old WM order data removed");
                                resultArray.forEach(function(result) {
                                    var order = new WMOrder({category: result.category, count: result.count});
                                    order.save(function(err3) {
                                        if(err3) {
                                            logger.error("JOB: Error in inserting the values to WM Orders DB " + err3);
                                            return;
                                        } else {
                                            logger.info("JOB: WM Orders data inserted successfully");
                                            return;
                                        }
                                    })
                                });
                            }
                        });
                    }				
                });
            }	
        });    
};

exports.schedulePayments = function() {
    logger.info("JOB: In Schdule Payment JOB control");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('JOB: Error Scheduled Payment stats module ' + err);
				console.log("JOB: Error: " + err);
				throw err;
			} else {
				connection.execute("SELECT TRUNC(TO_DATE(PAY_SUBMT_DT)), count(*) FROM PAY_INSTRUCTION WHERE PAY_ST=0 AND AUDIT_CREATE_DT > SYSDATE-20 AND AUDIT_CREATE_DT < sysdate AND PAY_SUBMT_DT < SYSDATE GROUP BY TO_DATE(PAY_SUBMT_DT) ORDER BY TO_DATE(PAY_SUBMT_DT) DESC", {}, function(err1, result) {
					if(err1) {
                        logger.error("JOB: Error in Scheduled Payment stats module query " + err1);
						console.log("JOB: Error in executing query : " + err1);
					} else {																			
						logger.info("JOB: Record fetched from DB for Scheduled Payment stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.day = result.rows[i][0];
                            resultObj.count = result.rows[i][1];
                            resultArray.push(resultObj);                            
                        }
                        SchedulePayments.remove({}, function(err2) {
                           if(err2) {
                               logger.error("JOB: Error in dropping the schedule payments DB");
                               return;
                           } else {
                               logger.info("JOB: Old Schedule Payments data dropped");
                               resultArray.forEach(function(result) {
                                  var payment = new SchedulePayments({day: result.day, count: result.count}) ;
                                   payment.save(function(err3) {
                                      if(err3)  {logger.error("JOB: Error in inserting data to Schedule Payments DB " + err3); return;}
                                       else {logger.info("JOB: Data inserted to Schedule Payments DB successgully"); return;}
                                   });
                               });
                           }
                        });
					}				
				});
			}	
		});
};

exports.transNotify = function() {
    logger.info("JOB: In Trans Notify JOB control");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('JOB: Error Trans Notify stats module ' + err);
				console.log("JOB Error: " + err);
				throw err;
			} else {
				connection.execute("select  to_date(PI.PAY_SUBMT_DT),count(*) from PAY_INSTRUCTION pi where PI.PAY_ST=3 and PI.AUDIT_CREATE_DT >  SYSDATE-20 and PI.AUDIT_CREATE_DT < SYSDATE AND PI.PAY_SUBMT_DT < SYSDATE group by to_date(PI.PAY_SUBMT_DT) ORDER BY TO_DATE(PI.PAY_SUBMT_DT) DESC", {}, function(err1, result) {
					if(err1) {
                        logger.error("JOB: Error in Trans Notify stats module query " + err1);
						console.log("JOB: Error in executing query : " + err1);						
					} else {																			
						logger.info("JOB: Record fetched from DB for Trans Notify stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.day = result.rows[i][0];
                            resultObj.count = result.rows[i][1];
                            resultArray.push(resultObj);                            
                        }
                        TransNotify.remove({}, function(err2) {
                           if(err2)  {
                               logger.error("JOB: Error in dropping TransNotify DB " + err2);
                               return;
                           } else {
                               resultArray.forEach(function(result) {
                                   var notify = new TransNotify({day: result.day, count: result.count});
                                   notify.save(function(err3) {
                                      if(err3) {logger.error("JOB: Error in inserting Trans Notify data to DB " + err3); return;} 
                                       else {logger.info("Trans Notify data inserted successfully"); return;}
                                   });
                               });
                           }
                        });
					}				
				});
			}	
		});
}

exports.CSErrorCodes = function() {
    logger.info("JOB: In CS error codes stats module");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('JOB: Error CS error codes stats module ' + err);
				console.log("JOB: Error: " + err);
				throw err;
			} else {
				connection.execute("SELECT AR.RMSG, T.MERCHANTID, T.SOURCE, COUNT (T.MERCHANTREFERENCENUMBER) COUNT FROM css_tdr t, CSS_TDR_APPLICATION_REPLY ar WHERE T.REQUESTID = AR.REQUESTID AND T.SOURCE IN ('SOAP Toolkit API', 'Batch Upload') AND AR.RFLAG <> 'SOK' GROUP BY AR.RMSG, T.MERCHANTID, T.SOURCE ORDER BY COUNT DESC", {}, function(err1, result) {
					if(err1) {
                        logger.error("JOB: Error in CS error codes module query " + err1);
						console.log("JOB: Error in executing query : " + err1);
					} else {																			
						logger.info("JOB: Record fetched from DB for CS error codes stats module" + result.rows);
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.responseMessage = result.rows[i][0];
                            resultObj.merchantID = result.rows[i][1];
                            resultObj.source = result.rows[i][2];
                            resultObj.count = result.rows[i][3];
                            
                            resultArray.push(resultObj);                            
                        }
                        CSErrorCode.remove({}, function(err2) {
                           if(err2) {
                               logger.error("JOB: error in dropping the CS error codes DB" + err2);
                               return;
                           } else {
                                logger.info("JOB: CS Error Codes DB dropped successfully");
                                resultArray.forEach(function(result) {
                                    var errorCode = new CSErrorCode({responseMessage: result.responseMessage, merchantID: result.merchantID, source: result.source, count: result.count});
                                    errorCode.save(function(err3) {
                                        if(err3) {logger.error("JOB: Error in inserting data to CS error codes DB " + err3); return;}
                                        else {logger.info("CS error codes data record inserted successfully"); return;}
                                    });
                                });
                           }
                        });
					}				
				});
			}	
		});
}