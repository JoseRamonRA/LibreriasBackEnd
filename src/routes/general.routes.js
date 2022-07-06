import { Router } from "express";
const router = Router();
const {
    getfiles,
    getfiles2,
    postrute,
    hello,
    newroute,
    postrename,
    postdelate,
    searchsimple,
    orderby,
    deleterecycle,
    restaurararch,
    deleteflujo,
    deletetask,
    deletearch,
    gettask,
    updatepropi,
    getencabe,
    updatencabe,
    getencabeorder
    
} = require('../controllers/general.controllers')

router.get('/getfiles',getfiles);
router.get('/getfiles2',getfiles2);
router.get('/encabeza',getencabe);
router.get('/encabezaorder',getencabeorder)
router.post('/postrute',postrute);
router.post('/newroute',newroute);
router.post('/names',postrename);
router.post('/delate',postdelate);
router.post('/search',searchsimple);
router.post('/orderby',orderby)
router.post('/deleterecycle',deleterecycle)
router.post('/restaurar',restaurararch)
router.post('/deleteflujo',deleteflujo)
router.post('/deletetask',deletetask)
router.post('/deletearch',deletearch)
router.post('/gettask',gettask)
router.post('/updatepropi',updatepropi)
router.post('/updateenca',updatencabe)

router.get('/',hello);


module.exports = router;