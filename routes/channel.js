const CC=require('../controllers/channel');
const verify=require('../verifyToken');
const router=require('express').Router();
router.get('/fetchall',CC.fetchall);
router.get('/fetchByUser',verify,CC.fetchByUser);
router.post('/addchannel',CC.addchannel);
module.exports=router;