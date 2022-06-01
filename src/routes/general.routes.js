import { Router } from "express";


const router = Router();

const {
    getfiles,
    getfiles2,
    postrute,
    hello,
    newroute,
    
} = require('../controllers/general.controllers')

router.get('/getfiles',getfiles);
router.get('/getfiles2',getfiles2);
router.post('/postrute',postrute);
router.post('/newroute',newroute);
router.get('/',hello);


module.exports = router;