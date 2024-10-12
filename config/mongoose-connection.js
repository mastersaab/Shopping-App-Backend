const mongoose=require('mongoose');
const config=require('config');
const dbgr=require("debug")("development:mongoose");

//********* */ $env:DEBUG="development:mongoose" ***********
// use this for the setting up of encironment

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    console.log(err);
});

module.exports=mongoose.connection;

