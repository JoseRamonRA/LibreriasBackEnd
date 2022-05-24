import { Router } from 'express';

const router = Router();

const generalroutes = require ("./general.routes");

//students
router.use('/general',generalroutes);

module.exports = router;