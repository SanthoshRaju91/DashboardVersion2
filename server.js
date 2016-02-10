var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride =  require('method-override');   
var config = require('./config.js');
var logger = require('./utils/loggerUtil.js').logger;
var path = require('path');
var fs = require('fs');

var jwt = require('express-jwt');

var userController = require('./controllers/userController.js');

//starting the web application server
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//connecting to mongoDB
mongoose.connect(config.processConfig.mongoURL, function(err){
    if(err) logger.error("Error in connecting to mongo DB"); 
    else logger.info("Connected to MongoDB");
}); 

//application configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.post('/register', userController.register);
app.post('/login', userController.login);

//rendering index.html page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//API routes
app.get('/api/commerceOptions/:category', function(req, res) {
	if(req.params.category === 'SMB') {
		res.json(config.businessType);
	} else {
		res.json(null);	
	}	
});

app.use('/api', jwt({secret: 'veryverysecret'}), require('./routes.js')(io));

http.listen(config.processConfig.port, function(err) {
    if(err) {       
        logger.error("Error in starting the port at " + config.processConfig.port);
    } else {       
        logger.info("Server listening on port: " + config.processConfig.port);
  } 
});

/*
app.on('stormpath.ready', function() {
    app.listen(config.port, function(err) {
       if(err) {       
           logger.error("Error in starting the port at " + config.port);
       } else {       
           logger.info("Server listening on port: " + config.port);
       } 
    });
});*/



