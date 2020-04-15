const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const hapi=require('@hapi/joi');
let user=new Schema({
    email:String,
    password:String,
    channel:[{
        type:Schema.Types.ObjectId,
        ref:'channel'
    }],
    country:{
        type:String
    }
})

module.exports=mongoose.model('user',user);