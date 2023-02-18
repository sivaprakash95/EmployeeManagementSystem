const dotenv = require("dotenv");
dotenv.config({path:"./server/config/node_env.env"});

const app = require("./app");
const config = require("./server/config/config");

// TO BIND & LISTEN CONNECTIONS ON SPECIFIED PORT
app.listen(config.port,()=>{  // IMPLEMENTING LISTNER
    console.log(`Node is running at ${"http:\\\\localhost:"+config.port}`);
});