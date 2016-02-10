var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    privileges: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});


UserSchema.pre('save', function(next) {
   var user  = this;
   
    if(!user.isModified('password')) return next();
    
    bcrypt.genSalt(10, function(err, salt) {
       if(err) return next(err);
        
        bcrypt.hash(user.password, salt, function(err, hash) {
           if(err) return next(err);
            
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if(err) return callback(err);
        
        callback(isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);