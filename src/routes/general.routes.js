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
    gettasksorder,
    updatepropi,
    getencabe,
    updatencabe,
    getencabeorder,
    movefiledir,
    postfileid,
    updatetask,
    documentosorderby,
    setdocbinary,
    rejectdoc,
    rejectflujo,
    rejecttask,
    restoreflujo,
    restoretask,
    renamedoc,
    documentsalone
    
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
router.post('/renamedoc',renamedoc)
router.post('/updatepropi',updatepropi)
router.post('/updateenca',updatencabe)
router.post('/move',movefiledir)
router.post('/gettaskorder',gettasksorder);
router.post('/postfileid',postfileid);
// router.post('/updatetask',updatetask);
router.post('/documentosorderby',documentosorderby)
router.post('/setdocbinary',setdocbinary)

router.post('/rejectdoc',rejectdoc)
router.post('/rejectflujo',rejectflujo)
router.post('/rejecttask',rejecttask)

router.post('/restoreflujo',restoreflujo)
router.post('/restoretask',restoretask)

router.post('/documentsalone',documentsalone)

router.get('/',hello);


module.exports = router;