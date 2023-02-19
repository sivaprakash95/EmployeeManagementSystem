const dotenv = require("dotenv");
dotenv.config({path:"./server/config/node_env.env"});


const mongoose = require("mongoose");
const DB = process.env.APP_DB
mongoose.connect(DB, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true
})
.then((con)=>{console.log("DB Connected Successfully")})
.catch((err)=>{console.log("DB Connected Unsuccessfully : ", err)})

const app = require("./app");
const config = require("./server/config/config");

// TO BIND & LISTEN CONNECTIONS ON SPECIFIED PORT
app.listen(config.port,()=>{  // IMPLEMENTING LISTNER
    console.log(`Node is running at ${"http:\\\\localhost:"+config.port}`);
});