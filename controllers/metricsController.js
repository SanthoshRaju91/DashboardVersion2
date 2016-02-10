var oracle = require('oracledb'); 
var nodeExcel=require('excel-export');
var config = require('../config.js');
var logger = require('../utils/loggerUtil.js').logger;
var Cache = require('../utils/cacheUtil.js');

module.exports.reportProblemStats = function(req, res) {
    logger.info("In Report-Problem stats module");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('Error Report-Problem stats module ' + err);
				console.log("Error: " + err);
				throw err;
			} else {
				connection.execute("select  TO_CHAR(rp.AUDIT_CREATE_DT, 'MM/YYYY') AS MTH, COUNT(*) from REPORT_PROBLEM rp where (RP.REQUEST_TYPE='CONTACTUS' OR RP.REQUEST_TYPE IS NULL) and rp.AUDIT_CREATE_DT BETWEEN to_date('01/01/2015', 'mm/dd/yyyy') AND to_date('12/31/2015', 'mm/dd/yyyy')GROUP BY TO_CHAR(rp.AUDIT_CREATE_DT, 'MM/YYYY')ORDER BY MTH", {}, function(err1, result) {
					if(err1) {
                        logger.error("Error in Report-Problem stats module query " + err1);
						console.log("Error in executing query : " + err1);
						res.json({status: 500, message: 'Error occured!!'});
					} else {																			
						logger.info("Record fetched from DB for Report-Problem stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.month = result.rows[i][0];
                            resultObj.count = result.rows[i][1];
                            resultArray.push(resultObj);                            
                        }
                        res.json({status: 200, result: JSON.stringify(resultArray)});
					}				
				});
			}	
		});
}


module.exports.wmOrderStats = function(req, res) {    
    logger.info("In WM-Order stats module");
    Cache.get('wmOrderStats', function(err, value) {
       if(err) {
           logger.error("Error in fetching details from cache " + err);
           res.json({status: 500, message: 'Error'});
       } else if(!value) {
           logger.error("No value in cache");
           oracle.getConnection({
                user: config.ENV.user,
                password: config.ENV.password,
                connectString: config.ENV.connectString
            }, function(err, connection) {
                if(err) {
                    logger.error('Error WM-Order stats module ' + err);
                    console.log("Error: " + err);
                    throw err;
                } else {
                    connection.execute("select CAT.CATEGORY_GROUP, count(*) from COMMERCE_ADMIN.BLC_ORDER ord join COMMERCE_ADMIN.BLC_ORDER_ITEM oi on OI.ORDER_ID=ORD.ORDER_ID join COMMERCE_ADMIN.WM_CATEGORY cat on CAT.CATEGORY_ID=OI.CATEGORY_ID where trunc(ORD.DATE_CREATED) > sysdate-10 group by CAT.CATEGORY_GROUP", {}, function(err1, result) {
                        if(err1) {
                            logger.error("Error in WM-Order stats module query " + err1);
                            console.log("Error in executing query : " + err1);
                            res.json({status: 500, message: 'Error occured!!'});
                        } else {																			
                            logger.info("Record fetched from DB for WM-Order stats module");
                            var resultArray = [];
                            for(var i=0; i< result.rows.length; i++) {
                                var resultObj = {};
                                resultObj.category = result.rows[i][0];
                                resultObj.count = result.rows[i][1];
                                resultArray.push(resultObj);                            
                            }
                            Cache.setCache('wmOrderStats', JSON.stringify(resultArray), logger);
                            res.json({status: 200, result: JSON.stringify(resultArray)});
                        }				
                    });
                }	
            });           
       } else {
           logger.info("Data retrieved from cache successfully");
           res.json({status: 200, result: value});
       }
    });
}


module.exports.scheduledPaymentStats = function(req, res) {
    logger.info("In Scheduled Payment stats module");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('Error Scheduled Payment stats module ' + err);
				console.log("Error: " + err);
				throw err;
			} else {
				connection.execute("SELECT TRUNC(TO_DATE(PAY_SUBMT_DT)), count(*) FROM PAY_INSTRUCTION WHERE PAY_ST=0 AND AUDIT_CREATE_DT > SYSDATE-20 AND AUDIT_CREATE_DT < sysdate AND PAY_SUBMT_DT < SYSDATE GROUP BY TO_DATE(PAY_SUBMT_DT) ORDER BY TO_DATE(PAY_SUBMT_DT) DESC", {}, function(err1, result) {
					if(err1) {
                        logger.error("Error in Scheduled Payment stats module query " + err1);
						console.log("Error in executing query : " + err1);
						res.json({status: 500, message: 'Error occured!!'});
					} else {																			
						logger.info("Record fetched from DB for Scheduled Payment stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.day = result.rows[i][0];
                            resultObj.count = result.rows[i][1];
                            resultArray.push(resultObj);                            
                        }
                        res.json({status: 200, result: JSON.stringify(resultArray)});
					}				
				});
			}	
		});
}

module.exports.transNotifyStats = function(req, res) {
    logger.info("In Trans Notify stats module");
    oracle.getConnection({
			user: config.ENV.user,
			password: config.ENV.password,
			connectString: config.ENV.connectString
		}, function(err, connection) {
			if(err) {
                logger.error('Error Trans Notify stats module ' + err);
				console.log("Error: " + err);
				throw err;
			} else {
				connection.execute("select  to_date(PI.PAY_SUBMT_DT),count(*) from PAY_INSTRUCTION pi where PI.PAY_ST=3 and PI.AUDIT_CREATE_DT >  SYSDATE-20 and PI.AUDIT_CREATE_DT < SYSDATE AND PI.PAY_SUBMT_DT < SYSDATE group by to_date(PI.PAY_SUBMT_DT) ORDER BY TO_DATE(PI.PAY_SUBMT_DT) DESC", {}, function(err1, result) {
					if(err1) {
                        logger.error("Error in Trans Notify stats module query " + err1);
						console.log("Error in executing query : " + err1);
						res.json({status: 500, message: 'Error occured!!'});
					} else {																			
						logger.info("Record fetched from DB for Trans Notify stats module");
                        var resultArray = [];
                        for(var i=0; i< result.rows.length; i++) {
                            var resultObj = {};
                            resultObj.day = result.rows[i][0];
                            resultObj.count = result.rows[i][1];
                            resultArray.push(resultObj);                            
                        }
                        res.json({status: 200, result: JSON.stringify(resultArray)});
					}				
				});
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