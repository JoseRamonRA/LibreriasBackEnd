import { Router } from "express";


const router = Router();

const {
    getfiles,
    hello,
    
} = require('../controllers/general.controllers')

router.get('/getfiles',getfiles);
router.get('/',hello);



module.exports = router;