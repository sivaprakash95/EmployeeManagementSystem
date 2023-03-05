const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const crypto = require('crypto');

const app = express();

// DECLARE ROUTES
// const userRoute = require("./server/routes/apis/usersRoute")
const loginRoute = require("./server/routes/loginRoute")

// PARSE INCOMMING REQUEST WITH JSON PAYLOADS
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// CREATING 24 HOURS FROM MILLISECONDS
const oneDay = 1000 * 60 * 60 * 24;
const secrectkey = new Date().getUTCMilliseconds()+"@UUID-"+crypto.randomUUID()

//SESSION
app.use(sessions({
    secret: secrectkey,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// COOKIE PARSER
app.use(cookieParser());

// SERVING TEMPLATE
app.set("view engine","ejs");
app.set('views', './server/views');

// DEFINE STATIC FOLDER
app.use(express.static(`${__dirname}/public`))

if(process.env.NODE_APP.toString().toLowerCase() == "development"){
    // SIMLIFY THE PROCESS OF LOGGING REQUEST
    app.use(morgan("dev"));
}

// SET UTC TIME STAMP FOR EVERY REQUEST FOR TIMEZONE
app.use((req,res,next)=>{
    req.timeStamp = new Date().toUTCString().replace(" GMT","Z");
    next();
})

// DEFINE ROUTES
// app.use("/api/v1/users",userRoute)
app.use("/ems",loginRoute)

module.exports = app;