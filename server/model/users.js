var mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');


var UserSchema = new mongoose.Schema({
    full_name:{
        type:String,
        require:[true,"username cann't be blank"],
        trim:true,
    },
    email:{
        type:String,
        require:[true,"email cann't be blank"],
        unique:[true,"email already exists!"],
        match: [/\S+@\S+\.\S+/, 'email is invalid'],
        trim:true,
        lowercase: true,
        index:true
    },
    bio:String,
    image:String,
    hash:String,
    salt:String,
    isActive:{
        type:Boolean,
        default:false
    },
    userType:{
        type:String,
        default:["employee","admin","client","anonymous"],
        trim:true,
        lowercase: true,
        index:true
    }
},{timestamps:true})

// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

mongoose.model('User', UserSchema)