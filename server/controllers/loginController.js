var mongoose = require('mongoose')
require('../model/users');
const userModel = mongoose.model('User')
const crypto = require('crypto');
const express = require("express");

const app = express();

exports.getLogin = (req,res)=>{
    if(!req.session.user_data){
        res.render("../views/userLogin/login.ejs")
    }
    else{
        res.redirect("/ems/dashboard");
    }
    
}

exports.checkLoginBody = (req,res,next)=>{
    console.log(req.body)
    if(!req.body.email || !req.body.password){
        return res.status(404).json({message:"email or password missing!"})
    }
    next();
}

exports.postLogin = (req,res)=>{
    user_apis.getUserByEmail(req)
    .then((data)=>{
        if(data.success){
            req.session.user_data = data.data;
            res.status(200).json({success:true,message:data.message})
        }
        else{
            res.status(401).json({success:false,message:data.message,element:data.element })
        }
    })
    .catch((err)=>{
        console.log("Invalid Post Login", err)
        res.status(500).json({success:false,message:`Internel Server Error!`})
    })
}

exports.getRegister = (req,res)=>{
    res.render("../views/userLogin/register.ejs")
}

exports.checkRegisterBody = (req,res,next)=>{
    if(!req.body.fullName || !req.body.email || !req.body.password){
        return res.status(404).json({success:false, message:"full name or email or password missing!"})
    }
    next();
}

exports.postRegister = (req,res)=>{
    user_apis.createUser(req)
    .then((data)=>{
        console.log({data});
        res.status(200).json({success:true,message:"User Registered Successfully!"})
    })
    .catch((err)=>{
        console.log("Invalid Post Login", err)
        res.status(500).json({success:false,message:`Internel Server Error!`})
    })
}

exports.getDashboard = (req,res)=>{
    if(req.session.user_data){
        res.render("dashboard.ejs",{email:req.session.user_data.email})
    }
    else{
        res.redirect("/ems/login");
    }
    
}

exports.getLogout = (req,res)=>{
    req.session.destroy(()=>{
        // req.logout();
        // req.flash('success','Successfully logged out!');
        res.redirect("/ems/login");
    });   
}

let user_apis = {
    createUser : (req)=>{
        return new Promise((resolve,reject)=>{
            let userData = req.body;
            let random_salt = Math.round((new Date().valueOf() * Math.random())) + '';
            let hashed_password = crypto.createHmac('sha1', random_salt).update(userData.password).digest('hex');
            
            
            userModel.create({
                full_name:userData.fullName,
                email:userData.email,
                hash:hashed_password,
                salt:random_salt,
            })
            .then((userCreate)=>{
                resolve({success:true,message:"User Created Successfully.",data:userCreate})
            })
            .catch((err)=>{
                console.log("Invalid Create User",err);
                reject({success:true,message:`User Not Created Successfully - ${err}`})
            })
        })
    },
    updateUser:(req)=>{
        return new Promise((resolve,reject)=>{
            resolve(true)
        })
    },
    deleteUser:(req)=>{
        return new Promise((resolve,reject)=>{
            resolve(true)
        })
    },
    getAllUser:(req)=>{
        return new Promise((resolve,reject)=>{
            resolve(true)
        })
    },
    getSingleUser:(req)=>{
        return new Promise((resolve,reject)=>{
            resolve(true)
        })
    },
    getUserByEmail:(req)=>{
        return new Promise((resolve,reject)=>{
            let email = req.body.email;
            let password = req.body.password;
            userModel.findOne({email})
            .lean()
            .then((userData)=>{
                console.log({userData})
                if(userData){
                    let random_salt = userData.salt;
                    let stored_password_hash = userData.hash;
                    let users_password_hash = crypto.createHmac('sha1', random_salt).update(password).digest('hex');

                    if(stored_password_hash.toString() == users_password_hash.toString()){
                        delete userData.hash;
                        delete userData.salt;
                        resolve({success:true,message:"Login Successfully!",data:userData});
                    }
                    else{
                        resolve({success:false,message:"Wrong Password!",element:"password"});
                    }
                }
                else{
                    resolve({success:false,message:"Email Not Found!",element:"email"});
                }
            })
            .catch((err)=>{
                console.log("Get User By Email Error - ",err)
                reject(err)
            })
        })
    }
}