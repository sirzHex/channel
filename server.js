const express = require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const PORT=5555;
const router=express.Router();
const login=require('./routes/login');
const channel=require('./routes/channel');
const dotenv=require('dotenv');


dotenv.config();
mongoose.connect(process.env._DB_CS,{useNewUrlParser:true,useUnifiedTopology: true},err=>{
    console.log(`we are on the db !`);
})
const _DB= mongoose.connection;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router);
router.use('/login',login);
router.use('/channel',channel);
router.get('/',(req,res)=>{
    res.send('<h1>THIS IS THE MAIN PAGE FOR THE APPLICATION</h1>')
})
app.use(express.json());
app.listen(PORT,(err)=>{
    if(!err)console.log(`listening on port:${PORT}`);
})