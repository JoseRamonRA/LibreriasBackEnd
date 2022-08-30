import { Router } from 'express';

const router = Router();

const generalroutes = require ("./general.routes");
const hoe = require('./hoe');
const Users = require('./users.routes')

router.use('/LibreriaHOE',generalroutes);

//Para las peticiones de HOE
router.use('/HOE',hoe);

//Para Peticiones de Usuarios
router.use('/Users',Users)

module.exports = router;