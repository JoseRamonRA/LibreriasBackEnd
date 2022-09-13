import { Router } from "express";
const router = Router();

const multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        
        cb(null,'./src/Documents/Images')
    },
    filename:function(req,file,cb){
        cb(null,`${file.originalname}`)
    }
})

const upload = multer({storage:storage})


const {
    getfiles,
    getfiles2,
    postrute,
    hello,
    newroute,
    postrename,
    updatefileVers_Sig,
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
    getflujoid,
    rejecttask,
    restoreflujo,
    restoretask,
    renamedoc,
    documentsalone,
    createcarpet,
    relationfolder,
    getrelationfolder,
    updatedocscar,
    searchcarpet,
    deletegroupsf,
    deletegroupsimple,
    renamecarpetdb,

    // downxlsxgrafic,
    // DownloadXLSX,
    DownloadXLXSGra,
    DownloadXLXSList,
    DelateIMGXLSX,

    //*Reports 
    reportsgrafics
    
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
router.post('/updatefileVers_Sig',updatefileVers_Sig);

router.post('/rejectdoc',rejectdoc)
router.post('/rejectflujo',rejectflujo)
router.post('/getflujoid',getflujoid)
router.post('/rejecttask',rejecttask)

router.post('/restoreflujo',restoreflujo)
router.post('/restoretask',restoretask)

router.post('/documentsalone',documentsalone)

router.post('/createcarpet',createcarpet)
router.post('/relationfolder',relationfolder)
router.post('/getrelationfolder',getrelationfolder)
router.post('/deletegroupsimple',deletegroupsimple)
router.post('/deletegroupsf',deletegroupsf)
router.post('/updatedocscar',updatedocscar)
router.post('/searchcarpet',searchcarpet)
router.post('/renamecarpetdb',renamecarpetdb)

//*Reports
router.post('/reportsgrafics',reportsgrafics)

router.get('/hello',hello);

//*prueba libreria XLSX XLSX-POPULATE
// router.post('/downxlsxgrafic',downxlsxgrafic)
// router.post('/DownloadXLSX',DownloadXLSX)

//* pruebas Libreria EXCEL4NODE
router.post('/DownloadXLXSGra',DownloadXLXSGra)
router.post('/DownloadXLXSList',DownloadXLXSList);
router.post('/DelateIMGXLSX',DelateIMGXLSX);


//*routerpost
router.post('/updateSS',upload.single('myImg'),async(req,res)=>{
try {
    return res.json({
        success:true,
        operation:req.body.clave,
        message:'Return imgname'
    })

   } catch (error) {
       console.log(error.message);
       res.status(400).json({ error });
   }
})

module.exports = router;