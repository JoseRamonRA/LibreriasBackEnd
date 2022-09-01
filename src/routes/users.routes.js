import { Router } from "express";
const router = Router();

const {
    hellousers,
    InsertGrupo,
    searchgroup,
    updategroup,
    deletegroup,
    getGroups

} = require('../controllers/usuarios.controllers')

router.get('/hello',hellousers)
router.get('/getGroups',getGroups)

router.post('/InsertGrupo',InsertGrupo)
router.post('/searchgroup',searchgroup)
router.post('/updategroup',updategroup)

router.post('/deletegroup',deletegroup)

module.exports = router;