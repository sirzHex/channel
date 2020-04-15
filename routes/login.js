const router=require('express').Router();
const LC=require('../controllers/login');
const verify=require('../verifyToken');
router.post('/signin',LC.signin);
router.post('/signup',LC.signup);
router.get('/fetchall',LC.fetchAll);
router.delete('/deleteall',LC.deleteAll);
router.post('/addchannel',verify,LC.addchannel);
module.exports=router;