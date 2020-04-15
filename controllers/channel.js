const joi=require('@hapi/joi');
const LM=require('../models/login');
const CM=require('../models/channel');
const verify =require('../verifyToken');
const schema=joi.object({
    name:joi.string().min(3).max(50),
    link:joi.string().min(10).max(100),
    country:joi.string().min(10).max(50),
    viewers:joi.array()
});

exports.fetchall=async (req,res)=>{
    let getdata=await CM.find();
    if(getdata.length>0)return res.status(200).send(getdata);
    return res.status(404).send('not found');
}

exports.fetchByUser=async (req,res) => {
    const {_id}=req.user
    const channels=await LM.find({_id:_id.toString()});
    if(channels.length>0){
        return res.status(200).send(channels[0].channel);
    }
    return res.send('oops');
}
exports.addchannel=async(req,res)=>{
    const isValid=schema.validate({name,link,country,viewers}=req.body);
    if(!isValid)return res.status(400).send({error}=isValid);
    const exist=await CM.find({name:req.body.name});
    if(exist.length>0)return res.status(400).send('already exist');
    let channel=new CM({
        name:req.body.name,
        link:req.body.link,
        viewers:req.body.viewers,
        country:req.body.country
    });
    try{
        const save=await channel.save();
        return res.status(200).send(save);
    }
    catch(error){
        return res.status(400).send(error);
    }
}