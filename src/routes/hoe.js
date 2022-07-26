const express = require("express");
const multer = require("multer");
const router = express.Router();
const { 
    extraerReq,
    crearDocumento,
    crearCarpeta,
    crearTarea,
    extraerTarea,
    extrearTareas,
    crearFlujo,
    aprobacionTarea,
    finalizarFlujo,
    rechazarFlujo,
    aprobacionDoc,
    rechazarDoc,
    infoDocumento
} = require('../controllers/funciones');
const storage = multer.diskStorage({
    filename: function (res, file, cb) {
     
      const arreglo = file.originalname.split("§");
      cb(null, `${arreglo[0]}§${arreglo[1]}`); 
    },
    destination: function (res, file, cb) {
    cb(null, `./uploads`); 
    },
  });
  
const subir = multer({ storage });

router.post("/subirDocumento",subir.single("archivoHOE"), async (req, res) => {
    try {
         res.json({
            mensaje:"Se subio el archivo"
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
    }
});
router.post("/carga/:idUser", async (req, res) => {
    try {
         let documento = await new crearDocumento(
             req.params.idUser,req.body.nombre,
             req.body.extension, req.body.norehoe,
             1,new Date(),1,2,req.body.idcarpeta,
             req.body.doctyhoe,req.body.reviehoe1,
             req.body.reviehoe2,req.body.reviehoe3,req.body.codehoe,req.params.idUser,
             new Date()
         );
        
         let flujo = await new crearFlujo(
             documento.recordset[0].ID_DOC,new Date(),1
         );
         let tarea = await new crearTarea(
            documento.recordset[0].ID_DOC,flujo.recordset[0].ID_F,
            req.body.reviehoe1,new Date(),'Se le ha asignado la tarea de revisión del documento: '+req.body.nombre+'',1
         );

         res.json({
            mensaje:"Insercion exitosa",
            data: documento
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
    }
});
router.get("/tarea/:idTarea", async (req, res) => {
    try {
         let tarea = await new extraerTarea(req.params.idTarea);
         res.json({
            mensaje:"Consulta exitosa",
            data: tarea
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
    }
});
router.get("/listaTareas/:idUser/:estatus", async (req, res) => {
    try {
         let listaTareas = await new extrearTareas(req.params.idUser,req.params.estatus);
         res.json({
            mensaje:"Consulta exitosa",
            data: listaTareas
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
    }
});
router.post("/rechazo/:idUser/:iddoc/:idflujo/:idtarea/:coment", async (req, res) => {
    try {

        let rechazoDoc = await new rechazarDoc(
            req.params.iddoc,3,req.params.idUser,new Date()
        );
        let rechazarF = await new rechazarFlujo(
            req.params.idflujo,new Date(),req.params.idUser,3,'Cancelado'
        );
        let cancelarTarea = await new aprobacionTarea(
            req.params.idtarea,new Date(),2,`${req.params.coment}`
        );
         res.json({
            mensaje:"Insercion exitosa",
            data: rechazoDoc
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
    }
});

router.post("/aprobar/:idUser/:iddoc/:idflujo/:idtarea", async (req, res) => {
    try {
        let info = await new infoDocumento(req.params.iddoc);
        let aprobar;
        let crearTareaN;
        let terminarTarea;
        let terminarFlujo;
        //Para el segundo revisor 
        
        if(info.recordset[0].Estatus_Seguimiento == 1 && info.recordset[0].ID_Revisor2 != 0){
            aprobar = await new aprobacionDoc(
                req.params.iddoc,2,2,req.params.idUser,new Date()
            );
           
            terminarTarea = await new aprobacionTarea(
                req.params.idtarea,new Date(),2,'Terminada'
            );
          
            crearTareaN = await new crearTarea(
                req.params.iddoc,req.params.idflujo,
                info.recordset[0].ID_Revisor2,new Date(),'Se le ha asignado la tarea de revisión del documento: '+info.recordset[0].Nombre+'',1
             );
            
        }else if(info.recordset[0].Estatus_Seguimiento == 2 && info.recordset[0].ID_Revisor3 != 0){
         //Para el tercer revisor 
         aprobar = await new aprobacionDoc(
            req.params.iddoc,2,3,req.params.idUser,new Date()
        );
        
        terminarTarea = await new aprobacionTarea(
            req.params.idtarea,new Date(),2,'Terminada'
        );

        crearTareaN = await new crearTarea(
            req.params.iddoc,req.params.idflujo,
            info.recordset[0].ID_Revisor3,new Date(),'Se le ha asignado la tarea de revisión del documento: '+info.recordset[0].Nombre+'',1
         );

        }else{
            //Para finalizar el flujo, una vez que se apruebe 
            terminarTarea = await new aprobacionTarea(
                req.params.idtarea,new Date(),2,'Terminada'
            );

            terminarFlujo = await new finalizarFlujo(
                req.params.idflujo,new Date(),2,'Flujo finalizado'
            );

            aprobar = await new aprobacionDoc(
                req.params.iddoc,1,info.recordset[0].Estatus_Seguimiento,req.params.idUser,new Date()
            )
        }
        // let rechazoDoc = await new rechazarDoc(
        //     req.body.iddoc,3,req.body.idUser,new Date()
        // );
        // let rechazarF = await new rechazarFlujo(
        //     req.body.idflujo,new Date(),req.body.idUser,3,'Cancelado'
        // );
        // let cancelarTarea = await new aprobacionTarea(
        //     req.body.idtarea,new Date(),2,'Cancelado'
        // );
         res.json({
            mensaje:"Insercion exitosa"
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error });
    }
});
module.exports = router;