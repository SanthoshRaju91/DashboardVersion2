var User = require('../models/userModel.js');
var logger = require('../utils/loggerUtil.js').logger;
var jwt = require('jsonwebtoken');


exports.login = function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    
    if(username == '' || password == '') {
        logger.error("Invalid login");
        res.json({status: 401, success: false, message: 'Invalid login'});
    }
    
    User.findOne({username: username}, function(err, user) {
       if(err) {
           logger.error("Error in login user" + err);
           res.json({status: 500, success: false, message: 'Error in login for user'});
       } else if(!user) {
           logger.error("User not found in DB for " + username);
           res.json({status: 404, success: false, message: 'User not found'});
       } else {
           user.comparePassword(password, function(isMatch) {
              if(!isMatch) {
                  logger.error("Password does not match for the user " + username);
                  return res.json({status: 401, success: false, message:    'password does not match'});
              } else {
                  var token = jwt.sign(user, 'veryverysecret', {expiresInMinutes: 60});
                  return res.json({status: 200, success: true, token: token, role: user.privileges});
              }
           });
       }
    });
}

exports.register = function(req, res) {
    var user = new User({username: req.body.username, password: req.body.password, privileges: req.body.privileges});
    
    user.save(function(err) {
       if(err) {
           logger.error("Error in registering the user " + err);
           res.json({status: 500, success: false, message: "Error in registering the user"});
       } else {
           logger.info("User registered successfully");
           res.json({status: 200, success: true, message: 'User registered'});
       }
    });
};