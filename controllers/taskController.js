var Task = require('../models/taskModel.js');
var logger = require('../utils/loggerUtil.js').logger;

exports.addTask = function(req, res) {
    logger.info("In task creation module");
    var task = new Task({taskName: req.body.taskName, taskDescription: req.body.taskDesc, assignedTo: req.body.assignedTo, status: 'Created'});
    task.save(function(err) {
        if(err) {
            logger.error("Error in creating task " + err);
            res.json({status: 500, success: false, message: 'Error in creating task'});
        } else {
            logger.info("Task created successfully");
            res.json({status: 200, success: true, message: 'Task created successfully'});
        }
    });
};


exports.getTasks = function(req, res) {
    Task.find({}, function(err, tasks) {
       if(err) {
           logger.error("Error in fetching tasks " + err);
           res.json({status: 500, success: false, message: 'Error in fetching tasks'});
       } else if(!tasks) {
           logger.error("No tasks available");
           res.json({status: 404, success: true, result: ''});
       } else {
           logger.info("Tasks fetched successfully");
           res.json({status: 200, success: true, result: tasks});
       }
    });
};

exports.getTask = function(req, res) {
    Task.findOne({_id: req.params.id}, function(err, task) {
       if(err) {
            logger.error("Error in fetching task " + err);
            res.json({status: 500, success: false, message: 'Error in fetching task'});  
       } else if(!task) {
            logger.error("No task available");
            res.json({status: 404, success: true, result: ''});
       } else {
           logger.info("Task fetched successfully");
           res.json({status: 200, success: true, result: task});
       }
    });
};

exports.updateTaskStatus = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.id}, {status: req.body.status}, function(err, task) {
       if(err)  {
            logger.error("Error in fetching task " + err);
            res.json({status: 500, success: false, message: 'Error in fetching task'});  
       } else if(!task) {
            logger.error("No task available");
            res.json({status: 404, success: false, message: 'Task not available'});   
       } else {
            logger.info("Task status updated successfully");
            res.json({status: 200, success: true, message: 'Task status updated successfully'});
       }
    });
};

exports.deleteTask = function(req, res) {
    Task.remove({_id: req.params.id}, function(err) {
       if(err) {
            logger.error("Error in deleting task " + err);
            res.json({status: 500, success: false, message: 'Error in deleting task'});  
       } else {
            logger.info("Task deleted successfully");
            res.json({status: 200, success: true, message: 'Task deleted successfully'});
       }
    });
};