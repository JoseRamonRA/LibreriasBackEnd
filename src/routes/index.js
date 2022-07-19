import { Router } from 'express';

const router = Router();

const generalroutes = require ("./general.routes");
const hoe = require('./hoe');

router.use('/LibreriaHOE',generalroutes);

//Para las peticiones de HOE
router.use('/HOE',hoe);

module.exports = router;