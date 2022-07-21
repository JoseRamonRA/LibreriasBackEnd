const chalk = require('chalk');

const path = require ('path');

import sql from '../Connection/conexion';

const { 
    infoDocumentos
} = require('./funciones');
const general={

    hello: async (req,res) =>{
        res.json("hola ")
    }, 

    getfiles : async (req,res)=>{
        const fs = require('fs');
        const urls = "http://localhost:4000/uploads/";

        fs.readdir("./uploads",(error,files)=>{
        if(error){
            throw error
        }

        var arr= [];
            for(var i=0;i<files.length;i++){
                var ne = new person(files[i].split(".",1).toString(), files[i].split(".").pop(),`${urls}${files[i]}`);
                arr.push(ne);
        }

    
  
        function person(nam,ext,url){
        this.name= nam;
        this.ext = ext;
        this.url = url;
        }

        res.json(arr)
    })
    },

    getfiles2 : async (req,res)=>{
        const fs2 = require('fs');

        var arr= [];

        const urls = "http://localhost:4000/uploads/";

        var ls =fs2.readdirSync("./uploads");
        let Archivos = await  new infoDocumentos();
        let datosArchivos = Archivos['recordset'];
        //console.log(datosArchivos);
        for(var i=0;i<ls.length;i++){
            const file  = path.join("./uploads",ls[i]);
            var dataFile =null;

            try{
               dataFile =fs2.lstatSync(file);
            }catch(e){}

            if(dataFile){
                if(ls[i].indexOf('Â§')>-1){
                    let dat = ls[i].split("Â§");
                    let id = Number(dat[0]);
                    let archivoHOE = datosArchivos.find(element => { return element.ID_DOC == id });
                
                    var ne = new person(id,dat[1], ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),archivoHOE.HOE_Code,archivoHOE.Document_Type_Hoe,"calidad","press",archivoHOE.No_Rev,"Ingles","2022-05-05",2,archivoHOE.Fecha_Modificacion,archivoHOE.ID_Revisor1,archivoHOE.ID_Revisor2,archivoHOE.ID_Revisor3,archivoHOE.ID_UserModifico,archivoHOE.Estatus);
                    arr.push(ne);
                }else{
                    var ne = new person(0,ls[i].split(".",1).toString(), ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),"PCQ0110-01","procedure","calidad","press","N","spanish","2022-05-05",2,"november 10,21",0,0,0,0,0);
                    arr.push(ne);
                }
                
             }
        }
        
        function person(id,nam,ext,url,dir,cod,tdo,are,sho,nor,len,fev,ane,mod,rev1,rev2,rev3,modifica,estatus){
        this.id=id;
        this.name= nam;
        this.ext = ext;
        this.url = url;
        this.dir = dir;
        this.cod = cod;
        this.tdo = tdo;
        this.are = are;
        this.sho = sho;
        this.nor = nor;
        this.len = len;
        this.fev = fev;
        this.ane = ane;
        this.mod = mod;
        this.rev1 = rev1;
        this.rev2 = rev2;
        this.rev3 = rev3;
        this.modifica = modifica;
        this.estatus = estatus;
        }



        //ordenar el vector por tipo
        var arr2=[];
        var j=0;

        for(var i=0;i<arr.length;i++){
            if(arr[i].dir==true){
                arr2[j]=arr[i];
                j++;
            }
        }

        for(var i=0;i<arr.length;i++){
            if(arr[i].ext=="docx" || arr[i].ext=="doc"){
                arr2[j]=arr[i];
                j++
            }
        }

        for(var i=0;i<arr.length;i++){
            if(arr[i].ext=="pdf"){
                arr2[j]=arr[i];
                j++
            }
        }

        for(var i=0;i<arr.length;i++){
            if(arr[i].ext=="xlsx" || arr[i].ext=="xls"){
                arr2[j]=arr[i];
                j++
            }
        }

        for(var i=0;i<arr.length;i++){
            if(arr[i].ext=="jpg" || arr[i].ext=="png"){
                arr2[j]=arr[i];
                j++
            }
        }

        res.json(arr2)
    },

    postfileid:async(req,res)=>{

        var enviar=[];
        var docpre=[];

        var iddoc=req.body.idoc;
        var band=false;

        let Archivos = await  new infoDocumentos();
        let datosArchivos = Archivos['recordset'];


        const path = require('path');
        const fs = require('fs');

        var data=[];

        function scanDirs(directoryPath){
        try{
            var ls=fs.readdirSync(directoryPath);

            for (let index = 0; index < ls.length; index++) {
                const file = path.join(directoryPath, ls[index]);
                var dataFile =null;
                try{
                    dataFile =fs.lstatSync(file);
                }catch(e){}

                if(dataFile){
                    data.push(
                    {
                        path: `http://localhost:4000\\${file}`,
                        isDirectory: dataFile.isDirectory(),
                    });

                    if(dataFile.isDirectory()){
                    scanDirs(file)
                    }
                }
            }
        }catch(e){}
        }
        function document(id,nam,ext,url,dir,cod,tdo,are,sho,nor,len,fev,ane,mod,rev1,rev2,rev3,modifica,estatus){
            this.id=id;
            this.name= nam;
            this.ext = ext;
            this.url = url;
            this.dir = dir;
            this.cod = cod;
            this.tdo = tdo;
            this.are = are;
            this.sho = sho;
            this.nor = nor;
            this.len = len;
            this.fev = fev;
            this.ane = ane;
            this.mod = mod;
            this.rev1 = rev1;
            this.rev2 = rev2;
            this.rev3 = rev3;
            this.modifica = modifica;
            this.estatus = estatus;
        }

        scanDirs('./uploads');

        for(var i=0;i<data.length;i++){
            var otro =data[i].path.split('\\').pop()
            var comp=otro.split('Â§',1).toString()

            if(iddoc==comp){
                band=true;
                docpre=data[i];
                var join=docpre.path.split('\\')
                docpre.path=join.join('/')
                let archivoHOE = datosArchivos.find(element => { return element.ID_DOC == iddoc });
                enviar = new document(archivoHOE.ID_DOC,archivoHOE.Nombre,archivoHOE.Extension,docpre.path,docpre.isDirectory, archivoHOE.HOE_Code,archivoHOE.Document_Type_Hoe,"calidad","press",archivoHOE.No_Rev,"Ingles","2022-05-05",2,archivoHOE.Fecha_Modificacion,archivoHOE.ID_Revisor1,archivoHOE.ID_Revisor2,archivoHOE.ID_Revisor3,archivoHOE.ID_UserModifico,archivoHOE.Estatus);
                
            }
        }

        if(band){
            res.json({
                success: true,
                response:enviar,
                message: `se encotro el documento con id = ${iddoc}`
            })
        }else{
            res.json({
                success: false,
                message: `no se encotro el documento con id = ${iddoc}`
            })
        }
    },

    postrute: async (req,res)=>{
        
        var arr= [];
        const fs2 = require('fs');
        const urls = `http://localhost:4000/uploads/${req.body.ruta}/`;
        let Archivos = await  new infoDocumentos();
        let datosArchivos = Archivos['recordset'];
        //console.log(datosArchivos);

        var ls =fs2.readdirSync(`./uploads/${req.body.ruta}`);

        for(var i=0;i<ls.length;i++){
            const file  = path.join(`./uploads/${req.body.ruta}`,ls[i]);
            var dataFile =null;

            try{
                dataFile =fs2.lstatSync(file);
             }catch(e){}
 
             if(dataFile){
                 if(ls[i].indexOf('Â§')>-1){
                     let dat = ls[i].split("Â§");
                     let id = Number(dat[0]);
                     let archivoHOE = datosArchivos.find(element => { return element.ID_DOC == id });
                 
                     var ne = new person(id,dat[1], ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),archivoHOE.HOE_Code,archivoHOE.Document_Type_Hoe,"calidad","press",archivoHOE.No_Rev,"Ingles","2022-05-05",2,archivoHOE.Fecha_Modificacion,archivoHOE.ID_Revisor1,archivoHOE.ID_Revisor2,archivoHOE.ID_Revisor3,archivoHOE.ID_UserModifico,archivoHOE.Estatus);
                     arr.push(ne);
                 }else{
                     var ne = new person(0,ls[i].split(".",1).toString(), ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),"PCQ0110-01","procedure","calidad","press","N","spanish","2022-05-05",2,"november 10,21",0,0,0,0,0);
                     arr.push(ne);
                 }
                 
            }
        }
        
        function person(id,nam,ext,url,dir,cod,tdo,are,sho,nor,len,fev,ane,mod,rev1,rev2,rev3,modifica,estatus){
            this.id=id;
            this.name= nam;
            this.ext = ext;
            this.url = url;
            this.dir = dir;
            this.cod = cod;
            this.tdo = tdo;
            this.are = are;
            this.sho = sho;
            this.nor = nor;
            this.len = len;
            this.fev = fev;
            this.ane = ane;
            this.mod = mod;
            this.rev1 = rev1;
            this.rev2 = rev2;
            this.rev3 = rev3;
            this.modifica = modifica;
            this.estatus = estatus;
            }
    
    
    
            //ordenar el vector por tipo
            var arr2=[];
            var j=0;
    
            for(var i=0;i<arr.length;i++){
                if(arr[i].dir==true){
                    arr2[j]=arr[i];
                    j++;
                }
            }
    
            for(var i=0;i<arr.length;i++){
                if(arr[i].ext=="docx" || arr[i].ext=="doc"){
                    arr2[j]=arr[i];
                    j++
                }
            }
    
            for(var i=0;i<arr.length;i++){
                if(arr[i].ext=="pdf"){
                    arr2[j]=arr[i];
                    j++
                }
            }
    
            for(var i=0;i<arr.length;i++){
                if(arr[i].ext=="xlsx" || arr[i].ext=="xls"){
                    arr2[j]=arr[i];
                    j++
                }
            }
    
            for(var i=0;i<arr.length;i++){
                if(arr[i].ext=="jpg" || arr[i].ext=="png"){
                    arr2[j]=arr[i];
                    j++
                }
            }
    
        res.json(arr2)
    
    },
    
    newroute:async (req,res)=>{
        var rutas = req.body.ruta;
        const fs = require('fs');
        console.log(rutas)
        fs.mkdirSync(`./uploads/${rutas}`,{recursive:true});
        res.json("ruta creada");
    },

    postrename:async (req,res)=>{
        var name = req.body.namenew;
        var ext = req.body.ext;
        var old = req.body.old;
        var rut = req.body.rutenv;
        var id  = req.body.id;

        if(old.indexOf('.')>-1){
            old = old.split('.',1).toString()
        }
    
        if(ext != 'pdf' && ext!='docx' && ext!="doc" && ext!="xlsx" && ext!="xls" && ext!="jpg" && ext!="png"){
            ext="";
        }else{
            ext="."+ext;
        }

        const fs = require('fs');
        console.log(rut,old,name,ext);
        fs.rename(`./uploads/${rut}${id+'Â§'+old}${ext}`, `./uploads/${rut}${id+'Â§'+name}${ext}`, (err) => {
            if (err) throw err;
            console.log('renamed complete');
        });

        res.json("renamed")
    },

    postdelate:async (req,res)=>{
        var name = req.body.name;
        var rut = req.body.rut;
        var dir = req.body.dir;

        const fs=require("fs");
        const p=require("path");
        let path=p.join(`./uploads/${rut}${name}`);


        try{
            if(dir){
                deleteFolder(path);
                var mensaje = "Carpeta Eliminada"
            }else{
                fs.unlinkSync(`./uploads/${req.body.name}`);
                var mensaje = "Archivo Eliminado"
            }
        }catch(e){
            res.json("error")
        }
        
        function deleteFolder(path) {
            let files = [];
            if( fs.existsSync(path) ) {
                files = fs.readdirSync(path);
                files.forEach(function(file,index){
                    let curPath = path + "/" + file;
                    if(fs.statSync(curPath).isDirectory()) {
                        deleteFolder(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
                fs.rmdirSync(path);
            }
        }

        res.json(mensaje);
    },

    searchsimple:async (req,res)=>{
        const aux = await new sql.Request(); 

        if(req.body.ext=="AllResults" && req.body.fecha=="AllResults"){
            const resu = await aux.query(`select * from Documentos where Nombre like '%${req.body.text}%' and ID_Contribuidor=${req.body.id};`)
            res.json(resu.recordset)
        }else{
            if(req.body.ext!="Allresults"){
                const resu = await aux.query(`select * from Documentos where Nombre like '%${req.body.text}%' and ID_Contribuidor=${req.body.id} and Extension='${req.body.ext}'`)
                res.json(resu.recordset)
            }
        }
      
    },
    
    orderby:async (req,res)=>{
        const aux = await new sql.Request();
        const resu = await aux.query(`select * from Documentos where Estatus=4 order by ${req.body.name} ${req.body.order}`)
        res.json(resu.recordset)
    },

    deleterecycle: async (req,res)=>{
        
        try{
        const aux = await new sql.Request();
        const resu = await aux.query(`delete from Documentos where ID_DOC=${req.body.id}`)
        
        if(!resu){
            return res.json({
                success: false,
                operation:resu.rowsAffected,
                message: "Mo se completo la operacion"
            })
        }

        return res.json({
            success: true,
            operation:resu.rowsAffected,
            message: "Archivo Eliminado Permanentemente!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deleterecycle`))

            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }


    },

    deleteflujo:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`delete from Flujo_Trabajo where ID_DOC=${req.body.id}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "Flujo Eliminado Permanentemente!!"
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deleteflujo`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    deletetask: async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`delete from Tareas where ID_DOC=${req.body.id}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "Tarea Eliminado Permanentemente!!"
            })
    
            }catch(e){
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deletetask`))
    
                return res.json({
                success: false,
                operation:e,
                message: `No se pudo haceer tu consulta fallo la base de datos `
                })
            }
    },

    restaurararch:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`update Documentos set Estatus=2 where ID_DOC=${req.body.id}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "Archivo Restaurado!!"
            })
    
            }catch(e){
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`restaurararch`))
    
                return res.json({
                success: false,
                operation:e,
                message: `No se pudo haceer tu consulta fallo la base de datos `
                })
            }
        
    },

    deletearch:async(req,res)=>{

        const ruta = req.body.ruta;
        const fs=require("fs");
        const rutanew = ruta.split('uploads/').pop();
        

        try{
        fs.unlinkSync(`./uploads/${rutanew}`,(error)=>{
            if(error){
                return res.json({
                    success: false,
                    message: "Mo se completo la operacion"
                })
            }
        });

        return res.json({
            success: true,
            message: "Archivo Eliminado Permanentemente!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deletearch`))
    
                return res.json({
                success: false,
                operation:e.message,
                message: `No se pudo haceer tu consulta fallo la base de datos `
                })
        }


    },

    gettask:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`select * from TaskDocs where ID_Doc=${req.body.id}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.recordsets.recordset,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.recordset[0],
                message: "Tarea Encontrada!!"
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`gettask`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    gettasksorder:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`select * from TaskDocs where ID_User_Asignado=${req.body.iduser} and Estatus=${req.body.esta} and (Nombre like '%${req.body.insearch}%' or Descripcion like '%${req.body.insearch}%') order by ${req.body.colum} ${req.body.order};`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.recordsets.recordset,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.recordsets[0],
                message: "Tareas Encontradas!!"
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`gettasksorder`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    updatepropi:async (req,res)=>{
        try{
            console.log(req.body)
            const aux = await new sql.Request();
            const resu = await aux.query(`update Documentos set Nombre='${req.body.name}', ID_Revisor1=${req.body.rev1},ID_Revisor2=${req.body.rev2},ID_Revisor3=${req.body.rev3}, Document_Type_Hoe='${req.body.secu}',No_Rev='${req.body.nore}',HOE_Code='${req.body.hoec}', Fecha_Modificacion=(CURRENT_TIMESTAMP) ,ID_UserModifico='${req.body.idcont}' where ID_DOC=${req.body.id}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                message: `Propiedades actualizadas ID_doc=${req.body.id}!!`
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`updatepropie`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    getencabe:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`select * from encabezados;`)
            
            if(!resu){
                return res.json({
                    success: false,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                res:resu.recordsets[0],
                message: `Devuelvo encabezados!!`
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`getencabe`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    updatencabe:async (req,res)=>{
        console.log(req.body)

        if(req.body.visi==true){
            req.body.visi=1;
        }else{
            req.body.visi=0;
        }

        console.log(req.body.visi);

        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`update encabezados set numerlu=${req.body.nume}, visible=${req.body.visi} ,nombre='${req.body.name}' where Id=${req.body.id};`)
            
            if(!resu){
                return res.json({
                    success: false,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                message: `Nuevos cambios en encabezados!!`
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`updateencabe`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    getencabeorder:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`select * from encabezados where visible=1 order by numerlu;`)
            if(!resu){
                return res.json({
                    success: false,
                    message: "Mo se completo la operacion"
                })
            }

            
            return res.json({
                success: true,
                res:resu.recordsets[0],
                message: `Devuelvo encabezados!!`
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`getencabeordery`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    movefiledir:async(req,res)=>{

        console.log(req.body)
  
        const fs = require('fs-extra')
        // Source file
        const src = `./uploads/${req.body.move}`;
        
        // Destination path
        const dest = `./uploads/${req.body.desti}/${req.body.nameid}`;
        
        // Function call
        // Using call back function
        fs.move(src, dest, (err) => {
        if (err) return console.log(err);
        console.log(`File successfully moved!!`);
        });

        res.json("simon")
    },

    // updatetask:async (req,res)=>{
    //     console.log(req.body)
    //     try{
    //         const aux = await new sql.Request();
    //         const resu = await aux.query(`update Tareas set Comentarios='${req.body.come}', Estatus=2 where ID_T=${req.body.idt};`)
            
    //         if(!resu){
    //             return res.json({
    //                 success: false,
    //                 message: "Mo se completo la operacion"
    //             })
    //         }
    
    //         return res.json({
    //             success: true,
    //             message: `Se moodifico la tarea!!`
    //         })
    
    //     }catch(e){
    //         console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`updatetask`))
    
    //         return res.json({
    //         success: false,
    //         operation:e,
    //         message: `No se pudo haceer tu consulta fallo la base de datos `
    //         })
    //     }
    // },
    
    documentosorderby:async(req,res)=>{

        try{
        const aux = await new sql.Request();
        const resu = await aux.query(`select * from Documentos Where Estatus!=4 order by ${req.body.colum} ${req.body.order};`)
            
        var archivoHOE =resu.recordset;

        var arr= [];
        const fs2 = require('fs');
        if(req.body.ruta==''){
            var urls = `http://localhost:4000/uploads${req.body.ruta}/`;
        }else{
            var urls = `http://localhost:4000/uploads/${req.body.ruta}/`;
        }
        
        

        var ls =fs2.readdirSync(`./uploads/${req.body.ruta}`);

        function documentor(id,nam,ext,url,dir,cod,tdo,are,sho,nor,len,fev,ane,mod,rev1,rev2,rev3,modifica,estatus){
            this.id=id;
            this.name= nam;
            this.ext = ext;
            this.url = url;
            this.dir = dir;
            this.cod = cod;
            this.tdo = tdo;
            this.are = are;
            this.sho = sho;
            this.nor = nor;
            this.len = len;
            this.fev = fev;
            this.ane = ane;
            this.mod = mod;
            this.rev1 = rev1;
            this.rev2 = rev2;
            this.rev3 = rev3;
            this.modifica = modifica;
            this.estatus = estatus;
        }

        for(var i=0;i<archivoHOE.length;i++){
            
            for(var j=0;j<ls.length;j++){
                const file  = path.join(`./uploads/${req.body.ruta}`,ls[j]);
                var dataFile =null;

                try{
                    dataFile =fs2.lstatSync(file);
                 }catch(e){}
    
                 if(dataFile){
                    var id =Number( ls[j].split('Â§',1));
                    var name = ls[j].split('Â§').pop()
                    if(archivoHOE[i].ID_DOC==id){
                        var ne = new documentor(id,name, ls[j].split(".").pop(),`${urls}${ls[j]}`,dataFile.isDirectory(),archivoHOE[i].HOE_Code,archivoHOE[i].Document_Type_Hoe,"calidad","press",archivoHOE[i].No_Rev,"Ingles","2022-05-05",2,archivoHOE[i].Fecha_Modificacion,archivoHOE[i].ID_Revisor1,archivoHOE[i].ID_Revisor2,archivoHOE[i].ID_Revisor3,archivoHOE[i].ID_UserModifico,archivoHOE[i].Estatus);
                        arr.push(ne);break;
                        
                    }
                    
                }
            }
        }

        for(var i=0;i<ls.length;i++){
            const file  = path.join(`./uploads/${req.body.ruta}`,ls[i]);
            var dataFile =null;

            try{
                dataFile =fs2.lstatSync(file);
             }catch(e){}

             if(dataFile.isDirectory()){
                var ne = new documentor(0,ls[i], ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),"PCQ0110-01","procedure","calidad","press","N","spanish","2022-05-05",2,"november 10,21",0,0,0,0,0);
                arr.unshift(ne);
            }
        }

        return res.json({
            success: true,
            operation:arr,
            message: `Se devolvieron los archivos ordenados por ${req.body.colum} de manerea ${req.body.order}`
        })
        
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`documentosorderby`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }

    },

    setdocbinary:async(req,res)=>{
        
        const fs = require('fs')
        try{

        const data = fs.readFileSync(`./uploads/${req.body.urlfind}`,{encoding:'base64', flag:'r'});
        fs.writeFile("src/EncodeFiles/base64.txt", data, function(err) {
            if(err) {
                return console.error(err);
            }
            console.log("File saved successfully!");
        });

        const aux = await new sql.Request();
        const resu = await aux.query(`update Documentos set Doc_Binario=CAST(N'${data.toString()}' AS varbinary(max)) where ID_DOC=${req.body.idoc};`)
            
            if(!resu){
                return res.json({
                    success: false,
                    message: "Mo se completo la operacion insersion binaria"
                })
            }
    
            return res.json({
                success: true,
                message: `Se inserto el documento binario!!`
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`setdocbinary`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }
    },

    rejectdoc:async (req,res)=>{
        
        try{
        const aux = await new sql.Request();
        const resu = await aux.query(`UPDATE Documentos SET Estatus =${req.body.esta},ID_UserModifico = ${req.body.iduser}, Fecha_Modificacion =CURRENT_TIMESTAMP WHERE ID_DOC = ${req.body.idoc}`)
        
        if(!resu){
            return res.json({
                success: false,
                operation:resu.rowsAffected,
                message: "Mo se completo la operacion"
            })
        }

        return res.json({
            success: true,
            operation:resu.rowsAffected,
            message: "Documento en estatus eliminado!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`rejectdoc`))

            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> rejectdoc  `
            })
        }


    },

    rejectflujo:async (req,res)=>{
        try{
            console.log(req.body.iduser,req.body.esta,req.body.coment,req.body.idflu)
            const aux = await new sql.Request();
            const resu = await aux.query(`UPDATE Flujo_Trabajo SET Fecha_Cancelacion = CURRENT_TIMESTAMP, ID_User_Cancelo = ${req.body.iduser}, Estatus = ${req.body.esta}, Comentarios = '${req.body.coment}' WHERE ID_F = ${req.body.idflu}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "Flujo en estatus eliminado!!"
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`rejectflujo`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> rejectflujo `
            })
        }
    },

    rejecttask: async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`UPDATE Tareas SET Fecha_Fin = CURRENT_TIMESTAMP, Estatus = ${req.body.esta}, Comentarios = '${req.body.coment}' WHERE ID_T = ${req.body.idflu}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "Tarea en estatus Eliminado!!"
            })
    
            }catch(e){
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`rejecttask`))
    
                return res.json({
                success: false,
                operation:e,
                message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> rejecttask`
                })
            }
    },

    restoreflujo:async (req,res)=>{
        try{
            console.log(req.body.iduser,req.body.esta,req.body.coment,req.body.idflu)
            const aux = await new sql.Request();
            const resu = await aux.query(`update Flujo_Trabajo set Fecha_Inicio = CURRENT_TIMESTAMP, Estatus=${req.body.esta}, Fecha_Cancelacion=NULL, Comentarios= '${req.body.coment}' where ID_F=${req.body.idflu}`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "Flujo Restaurado!!"
            })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`restoreflujo`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> rejectflujo `
            })
        }
    },

    restoretask: async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`update Tareas set Estatus=${req.body.esta}, Comentarios='${req.body.coment}', Fecha_Inicio= CURRENT_TIMESTAMP, Fecha_Fin=NULL where ID_Flujo=${req.body.idflu};`)
            
            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "Tarea Restaurada!!"
            })
    
            }catch(e){
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`restoretask`))
    
                return res.json({
                success: false,
                operation:e,
                message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> rejecttask`
                })
            }
    },


}

module.exports = general;