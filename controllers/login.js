const LM=require('../models/login');
const CM=require('../models/channel');
const joi=require('@hapi/joi');
const bcrypt=require('bcrypt')
const schema=joi.object({
    email:joi.string().min(3).max(500).email().required(),
    password:joi.string().min(3).max(500),
    country:joi.string().min(3).max(50)
})
const jwt=require('jsonwebtoken');
exports.signin= async (req,res)=>{
    const {error}=schema.validate({email,password,country}=req.body)
    if(error)return res.send('email or password not valid');
    const exist=await LM.findOne({email:req.body.email});
    if(!exist)return res.send('not exist in the db');
    const Pvalidate=bcrypt.compare(req.body.email,exist.password);
    if(!Pvalidate)return res.send('email or pass !');
    const token=jwt.sign({
        _id:exist._id
    },
    process.env.TOKEN_SECRET);
    return res.header('auth-token',token).send(token);

}
exports.signup=async (req,res)=>{
    const {error}=schema.validate({email,password,country}=req.body);
    if(error)return res.send('email or password not in the correct format');
    const exist=await LM.find({email:req.body.email});
    if(exist.length>0)return res.send('already exist');
    const genSalt=await bcrypt.genSalt(10);
    const hashPass=await bcrypt.hash(req.body.password,genSalt);

    let user=new LM({
        email:req.body.email,
        password:hashPass,
        country:req.body.country
    });
    try{
        const saveit=await user.save();
        return res.send(saveit);
    }
    catch{
        return res.send('error occured while saving');
    }
}
exports.addchannel=async (req,res) => {
    let email=req.body.email;
    let name=req.body.channel;
    const user=await LM.find({email:email});
    const channel=await CM.find({name:name});
    if(user.length===0 && channel.length===0){
        return res.status(400).send('data not founnd');
    }
    let checkUser=channel[0].viewers.indexOf(user[0]._id);
    let checkChannel=user[0].channel.indexOf(channel[0]._id);
    if(checkChannel!==-1){
        return res.status(400).send('user already has this channel');
    }
    if(checkUser!==-1)return res.status(400).send('channel already has this user');
    
    try{
        user[0].channel.push(channel[0]._id);
        channel[0].viewers.push(user[0]._id);
        const saveUser=await user[0].save();
        const saveChannel = await channel[0].save();
        return res.status(200).send(saveUser+' '+saveChannel);
    }
    catch(err){
        return res.status(400).send('error:'+err);
    }
}


exports.fetchAll=(req,res)=>{
    LM.find().then(result=>{
        res.send(result);
    }).catch(err=>{
        return res.send(err)
    })
}



exports.deleteAll=async (req,res) => {
    try{
        const deleteData=await LM.deleteMany({});
        return res.status(200).send(deleteData);
    }catch(error){
        return res.status(400).send(error);
    }
}