const express = require("express");
const morgan = require("morgan")
const app = express();

// DECLARE ROUTES
// const userRoute = require("./server/routes/apis/usersRoute")
const loginRoute = require("./server/routes/loginRoute")

// PARSE INCOMMING REQUEST WITH JSON PAYLOADS
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// SERVING TEMPLATE
app.set("view engine","ejs");
app.set('views', './server/views');
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