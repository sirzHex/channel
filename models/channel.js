const Schema=require('mongoose').Schema;

let channel = new Schema({
    name:{
        type:String,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    country:{
        type:String
    },
    viewers:[{
        rel:'user',
        type:Schema.Types.ObjectId
    }]
})

module.exports= require('mongoose').model('channel',channel);