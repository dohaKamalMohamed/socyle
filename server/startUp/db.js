const mongoose= require('mongoose');
module.exports=function(){
    mongoose.connect('mongodb://localhost/soycle',{useNewUrlParser:true,useCreateIndex: true, useUnifiedTopology: true})
    .then(()=>console.log("connection with database succeed"))
    .catch((err)=>(`connecting to database failed => ${err}`));
};