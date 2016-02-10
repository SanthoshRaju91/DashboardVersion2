var sendgrid = require('sendgrid')('LFS Quinnox','lfsQuinnox_2015');
var hogan = require('hogan.js');
var fs = require('fs');
var config = require('../config.js');
var logger = require('../utils/loggerUtil.js').logger;

module.exports.sendRequest = function(req, res) {
	if(req.body.name && req.body.email && req.body.query) {
		var template = fs.readFileSync('./newRequest.hjs', 'utf-8');
		var compiledTemplate = hogan.compile(template);
        logger.info("Mailing Address " + config.ENV.mailAddress);		
		sendgrid.send({
			to: config.ENV.mailAddress,
			from: 'noreply@dashboard.com',
			subject: 'New Request for eBusiness Dashboard Arrived',
			html: compiledTemplate.render({Name: req.body.name, Email: req.body.email, Requirement: req.body.query})
		}, function(err, response) {
			if(err) {
				logger.error("Error in sending mail " + err);
				res.json({status: 500, success: false, message: 'Errir in sending mail, please contact Admin'});
			} else {
                logger.info("Mail sent Successfully");
				res.json({status: 200, success: true, message: 'Message sent'});
			}
		});			
	} else {
		res.json({status: 403, success: false, message: 'Please fill the form with all the details.'});
	}
}