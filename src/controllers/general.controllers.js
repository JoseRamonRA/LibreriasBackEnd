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
        function document(url,dir,ID_DOC,ID_Contribuidor,Nombre,Extension,No_Rev,Doc_Actual,Fecha_Carga,Fecha_Vencimiento,Estatus_Seguimiento,Estatus,ID_Version_Anterior,ID_Version_Sig,ID_Carpeta,ID_Revisor1,ID_Revisor2,ID_Revisor3,HOE_Code,Document_Type_Hoe,ID_UserModifico,Fecha_Modificacion,Area,Shop,Lenguaje,Ane){
            this.url = url;
            this.dir = dir;
            this.ID_DOC = ID_DOC;
            this.ID_Contribuidor = ID_Contribuidor;
            this.Nombre = Nombre;
            this.Extension = Extension;
            this.No_Rev = No_Rev;
            this.Doc_Actual = Doc_Actual;
            this.Fecha_Carga = Fecha_Carga;
            this.Fecha_Vencimiento = Fecha_Vencimiento;
            this.Estatus_Seguimiento = Estatus_Seguimiento;
            this.Estatus = Estatus;
            this.ID_Version_Anterior= ID_Version_Anterior;
            this.ID_Version_Sig = ID_Version_Sig;
            this.ID_Carpeta = ID_Carpeta;
            this.ID_Revisor1 = ID_Revisor1;
            this.ID_Revisor2 = ID_Revisor2;
            this.ID_Revisor3 = ID_Revisor3;
            this.HOE_Code = HOE_Code;
            this.Document_Type_Hoe = Document_Type_Hoe;
            this.ID_UserModifico = ID_UserModifico;
            this.Fecha_Modificacion = Fecha_Modificacion;
            this.Area=Area;
            this.Shop=Shop;
            this.Lenguaje = Lenguaje;
            this.Ane = Ane;
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
                enviar = new document(docpre.path,docpre.isDirectory,archivoHOE.ID_DOC,archivoHOE.ID_Contribuidor,archivoHOE.Nombre,archivoHOE.Extension,archivoHOE.No_Rev,archivoHOE.Doc_Actual,archivoHOE.Fecha_Carga,archivoHOE.Fecha_Vencimiento,archivoHOE.Estatus_Seguimiento,archivoHOE.Estatus,archivoHOE.ID_Version_Anterior,archivoHOE.ID_Version_Sig,archivoHOE.ID_Carpeta,archivoHOE.ID_Revisor1,archivoHOE.ID_Revisor2,archivoHOE.ID_Revisor3,archivoHOE.HOE_Code,archivoHOE.Document_Type_Hoe,archivoHOE.ID_UserModifico,archivoHOE.Fecha_Modificacion,'calidad','press','Ingles',2)
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

    updatedocscar:async (req,res)=>{
        try{
            console.log(req.body)
            const aux = await new sql.Request(); 
            const resu = await aux.query(`update Documentos set ID_Carpeta =${req.body.idcarpet} where ID_DOC=${req.body.idoc}`);

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
                message: "id asignada Correctamente al documento!!"
            })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`updatedocscar`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> updatedocscar`
            })
        }

    },

    createcarpet:async (req,res)=>{
        try{
            const aux = await new sql.Request(); 
            const resu = await aux.query(`insert into Carpeta (Nombre,ID_Carpeta_Superior) values ('${req.body.name}',${req.body.carsup})`);

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
                message: "Carpeta Creada Correctamente!!"
            })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`createcarpet`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> createcarpet`
            })
        }
    },

    getrelationfolder:async (req,res)=>{
        try{
            var relafull=[];


            const aux = await new sql.Request(); 
            const resu = await aux.query(`select * from Carpeta_Grupo where ID_C =${req.body.idcarpet} order by ID_G asc;`);

            const resu2 = await aux.query(`select * from [BDCDMSUsuarios].[dbo].[Grupos];`);

            var relation = resu.recordset;
            var groups = resu2.recordset;

            for(var i=0;i<relation.length;i++){
                const finorno = groups.find( element => element.ID_G == relation[i].ID_G );
                if(finorno != undefined){
                    relafull.push(finorno)
                }
            }

        if(!resu){
            return res.json({
                success: false,
                message: "Mo se completo la operacion"
            })
        }
    
        return res.json({
            success: true,
            operation:relafull,
            message: `groups returned from the folder relationship with id =${req.body.idcarpet}!!`
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`getrelationfolder`))
            console.log(e);
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> getrelationfolder`
            })
        }
    },

    relationfolder:async (req,res)=>{
        try{
            var resu =[];

            const idcarpetapadre= req.body.idcarpet;
            const idgroup = req.body.idgroup;
            const rutepos = req.body.conter;
            const path = require('path');
            const fs = require ('fs')


            async function scanDirs(directoryPath){
                try{
                    var ls=fs.readdirSync(directoryPath); //*lee el directorio 
                    for (let index = 0; index < ls.length; index++) {
                        const file = path.join(directoryPath, ls[index]);
                        var dataFile =null;
                        try{
                            dataFile =fs.lstatSync(file);
                        }catch(e){}
            
                    if(dataFile){
            
                        if(dataFile.isDirectory()){ //* verifica que sea un directorio
                            var xy = rutepos;
                            console.log(xy);
                            var rute = file;
                            var anoth=rute.split('\\');
                            var ruteend = anoth[xy+1];
                            
                            var id=0;

                            if(ruteend!=undefined){
                                id= Number( ruteend.split('§',1));
                            }

                            if(id == idcarpetapadre){
                                var nombre = file.split('\\').pop();
                                var idcar= Number(nombre.split('§',1));
                                const aux = await new sql.Request();
                                const resu = await aux.query(`insert into Carpeta_Grupo (ID_C,ID_G) values (${idcar},${idgroup});`)
                            }
                            scanDirs(file)
                        }
                    }
                    }
            }catch(e){
                console.log(e) //*en caso de error imprime el error en consola
            }

        }
        scanDirs('./uploads')
        
        return res.json({
            success: true,
            operation:resu.recordset,
            message: "Carpetas con herencia relacionada!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`relationfolder`))
            console.log(e);
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> relationfolder`
            })
        }
    },

    deletegroupsimple:async (req,res)=>{
        try{
            const aux = await new sql.Request(); 
            const resu = await aux.query(`delete from Carpeta_Grupo where ID_C =${req.body.idcar};`);

        if(!resu){
            return res.json({
                success: false,
                message: "Mo se completo la operacion"
            })
        }
    
        return res.json({
            success: true,
            operation:resu.recordset,
            message: "Group delete in this folder!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`updategroup`))
            console.log(e);

            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> updategroup`
            })
        }
    },


    deletegroupsf:async (req,res)=>{

        try{
            var resu =[];

            const idcarpetapadre= req.body.idcarpet;
            const rutepos = req.body.conter;
            const path = require('path');
            const fs = require ('fs')


            async function scanDirs(directoryPath){
                try{
                    var ls=fs.readdirSync(directoryPath); //*lee el directorio 
                    for (let index = 0; index < ls.length; index++) {
                        const file = path.join(directoryPath, ls[index]);
                        var dataFile =null;
                        try{
                            dataFile =fs.lstatSync(file);
                        }catch(e){}
            
                    if(dataFile){
            
                        if(dataFile.isDirectory()){ //* verifica que sea un directorio
                            var xy = rutepos;
                            var rute = file;
                            var anoth=rute.split('\\');
                            var ruteend = anoth[xy+1];
                            
                            var id=0;

                            if(ruteend!=undefined){
                                id= Number( ruteend.split('§',1));
                            }

                            if(id == idcarpetapadre){
                                var nombre = file.split('\\').pop();
                                var idcar= Number(nombre.split('§',1));
                                const aux = await new sql.Request(); 
                                const resu = await aux.query(`delete from Carpeta_Grupo where ID_C =${idcar};`);
                            }
                            scanDirs(file)
                        }
                    }
                    }
            }catch(e){
                console.log(e) //*en caso de error imprime el error en consola
                return res.json({
                    success: false,
                    message: "an error has been detected!!"
                })
            }

        }
        scanDirs('./uploads')
        
        return res.json({
            success: true,
            operation:resu.recordset,
            message: "groups deleted from the folder with inheritance!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(` deletegroupsf`))
            console.log(e);
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==>  deletegroupsf`
            })
        }
    },

    searchcarpet:async (req,res)=>{

        try{
            const aux = await new sql.Request(); 
            const resu = await aux.query(`select * from Carpeta where ID_C='${req.body.nombrec}'`);

        if(!resu){
            return res.json({
                success: false,
                message: "Mo se completo la operacion"
            })
        }
    
        return res.json({
            success: true,
            operation:resu.recordset,
            message: "Carpeta Encontrada!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`searchcarpet`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> searchcarpet`
            })
        }
        

        
    },

    renamecarpetdb:async(req,res)=>{
        try{
            const aux = await new sql.Request(); 
            const resu = await aux.query(`update Carpeta set Nombre='${req.body.namenew}' where ID_C=${req.body.idc}`);

        if(!resu){
            return res.json({
                success: false,
                message: "Mo se completo la operacion"
            })
        }
    
        return res.json({
            success: true,
            message: "Carpeta Renombrada!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`renamecarpetdb`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> renamecarpetdb`
            })
        }
    },
    
    newroute:async (req,res)=>{
        try{
            var rutas = req.body.ruta;
            const fs = require('fs');
            console.log(rutas)
            fs.mkdirSync(`./uploads/${rutas}`,{recursive:true});
            
            var nombre = rutas.split('/').pop()

            return res.json({
                success: true,
                message: `se ha creado un nuevo directorio ${nombre}!!`
            })

        }catch(e){
            return res.json({
                success: false,
                operation: e.message,
                message: "no se ha creado el directorio"
            })
        }
    },

    postrename:async (req,res)=>{
        var name = req.body.namenew;
        var ext = req.body.ext;
        var old = req.body.old;
        var rut = req.body.rutenv;
        var id  = req.body.id;
        var est = old;

        est = est.split('§',1);
        console.log(est);

        if(old.indexOf('.')>-1){
            old = old.split('.',1).toString()
        }
    
        if(ext != 'pdf' && ext!='docx' && ext!="doc" && ext!="xlsx" && ext!="xls" && ext!="jpg" && ext!="png"){
            ext="";
        }else{
            ext="."+ext;
        }
        const fs = require('fs');

        if(ext==""){
            fs.rename(`./uploads/${rut}${id+'§'+old}${ext}`, `./uploads/${rut}${id+'§'+name}${ext}`, (err) => {
                if (err) throw err;
                console.log('renamed complete');
            });
        }else{
            fs.rename(`./uploads/${rut}${id+'Â§'+old}${ext}`, `./uploads/${rut}${id+'Â§'+est+'§'+name}${ext}`, (err) => {
                if (err) throw err;
                console.log('renamed complete');
            });
        }

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

        console.log(req.body)
        if(req.body.ext=="AllResults" && req.body.fecha=="AllResults"){
            var resu = await aux.query(`select * from Documentos where Nombre like '%${req.body.text}%'`)
        }else{
            if(req.body.ext!="Allresults"){
                var resu = await aux.query(`select * from Documentos where Nombre like '%${req.body.text}%' and Extension='${req.body.ext}'`)
            }
        }
        
        var archivoHOE= resu.recordset;

        const path = require('path');
        const fs = require('fs');

        var data=[];
        var arr=[];

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
            this.ID_DOC=id;
            this.Nombre= nam;
            this.Extension = ext;
            this.url = url;
            this.dir = dir;
            this.HOE_Code = cod;
            this.Document_Type_Hoe = tdo;
            this.are = are;
            this.sho = sho;
            this.No_Rev = nor;
            this.len = len;
            this.Fecha_Vencimiento = fev;
            this.ane = ane;
            this.Fecha_Modificacion = mod;
            this.ID_Revisor1 = rev1;
            this.ID_Revisor2 = rev2;
            this.ID_Revisor3 = rev3;
            this.ID_UserModifico = modifica;
            this.Estatus = estatus;
        }

        scanDirs('./uploads');

        for(var i=0;i<archivoHOE.length;i++){

            for(var j=0;j<data.length;j++){
                var otro =data[j].path.split('\\').pop()
                var comp = Number(otro.split('Â§',1))
                var ruta = data[j].path.split('\\')
                ruta = ruta.join('/')
                if(archivoHOE[i].ID_DOC== comp){
                    var ne = new document(archivoHOE[i].ID_DOC,archivoHOE[i].Nombre, archivoHOE[i].Extension,ruta,data[j].isDirectory,archivoHOE[i].HOE_Code,archivoHOE[i].Document_Type_Hoe,"calidad","press",archivoHOE[i].No_Rev,"Ingles","2022-05-05",2,archivoHOE[i].Fecha_Modificacion,archivoHOE[i].ID_Revisor1,archivoHOE[i].ID_Revisor2,archivoHOE[i].ID_Revisor3,archivoHOE[i].ID_UserModifico,archivoHOE[i].Estatus);
                    arr.push(ne);break;
                }
            }
        }
        // if(band){
        //     res.json({
        //         success: true,
        //         response:enviar,
        //         message: `se encotro el documento con id = ${iddoc}`
        //     })
        // }else{
        //     res.json({
        //         success: false,
        //         message: `no se encotro el documento con id = ${iddoc}`
        //     })
        // }
        res.json(arr)
      
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
        
        if(req.body.visi==true){
            req.body.visi=1;
        }else{
            req.body.visi=0;
        }


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
        if(req.body.desti==""){
            var dest = `./uploads/${req.body.nameid}`;
        }else{
            var dest = `./uploads/${req.body.desti}/${req.body.nameid}`;
        }
        
        // Function call
        // Using call back function
        fs.move(src, dest, (err) => {
        if (err){
            return res.json({
                success: false,
                message: `${err}`
            })
        };
        console.log(`File successfully moved!!`);
        return res.json({
            success: true,
            message: `${req.body.move.split('/').pop()} se ha cambiado de directorio a ${req.body.desti.split("/").pop()}`
        })
        });

        
    },

    renamedoc:async(req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`UPDATE Documentos SET Nombre='${req.body.namenew}.${req.body.ext}' WHERE ID_DOC=${req.body.id}`)
            
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
                message: "Nombre Actualizado en BD!!"
            })
    
        }catch(e){
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`renamedoc`))
    
                return res.json({
                success: false,
                operation:e,
                message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> renamedoc`
                })
        }
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
    
    documentsalone:async(req,res)=>{
        try{
            const aux = await new sql.Request();
            switch(req.body.role){
                case 'admin':var resu = await aux.query(`select * from DocsComplete Where Estatus!=4 order by ${req.body.colum} ${req.body.order};`);break;
                case 'revisor':var resu = await aux.query(`select * from DocsComplete where Estatus!=4 and (ID_Contribuidor=${req.body.iduser} or ID_Revisor1=${req.body.iduser} or ID_Revisor2=${req.body.iduser} or ID_Revisor3=${req.body.iduser} or Estatus=1) order by ${req.body.colum} ${req.body.order};`);break;
                case 'contribuidor':var resu = await aux.query(`select * from DocsComplete where Estatus!=4 and (ID_Contribuidor=${req.body.iduser} or ID_Revisor1=${req.body.iduser} or ID_Revisor2=${req.body.iduser} or ID_Revisor3=${req.body.iduser} or Estatus=1) order by ${req.body.colum} ${req.body.order};`);break;
                case 'visitante':var resu = await aux.query(`select * from DocsComplete Where Estatus=1 order by ${req.body.colum} ${req.body.order};`);break;
                default:var resu = await aux.query(`select * from DocsComplete Where Estatus=1 order by ${req.body.colum} ${req.body.order};`);break;
            }
            
        var archivoHOE= resu.recordset;

        const path = require('path');
        const fs = require('fs');

        var data=[];
        var arr=[];

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
        function document(id,contribuidor,nam,ext,url,dir,cod,tdo,are,sho,nor,len,fev,ane,mod,rev1,rev2,rev3,modifica,estatus,ID_User_Asignado){
            this.ID_DOC=id;
            this.ID_Contribuidor = contribuidor;
            this.Nombre= nam;
            this.Extension = ext;
            this.url = url;
            this.dir = dir;
            this.HOE_Code = cod;
            this.Document_Type_Hoe = tdo;
            this.are = are;
            this.sho = sho;
            this.No_Rev = nor;
            this.len = len;
            this.Fecha_Vencimiento = fev;
            this.ane = ane;
            this.Fecha_Modificacion = mod;
            this.ID_Revisor1 = rev1;
            this.ID_Revisor2 = rev2;
            this.ID_Revisor3 = rev3;
            this.ID_UserModifico = modifica;
            this.Estatus = estatus;
            this.ID_User_Asignado = ID_User_Asignado;
        }

        scanDirs('./uploads');

        for(var i=0;i<archivoHOE.length;i++){

            for(var j=0;j<data.length;j++){
                var otro =data[j].path.split('\\').pop()
                var comp = Number(otro.split('Â§',1))
                var ruta = data[j].path.split('\\')
                ruta = ruta.join('/')
                if(archivoHOE[i].ID_DOC== comp){
                    var ne = new document(archivoHOE[i].ID_DOC,archivoHOE[i].ID_Contribuidor,archivoHOE[i].Nombre, archivoHOE[i].Extension,ruta,data[j].isDirectory,archivoHOE[i].HOE_Code,archivoHOE[i].Document_Type_Hoe,"calidad","press",archivoHOE[i].No_Rev,"Ingles","2022-05-05",2,archivoHOE[i].Fecha_Modificacion,archivoHOE[i].ID_Revisor1,archivoHOE[i].ID_Revisor2,archivoHOE[i].ID_Revisor3,archivoHOE[i].ID_UserModifico,archivoHOE[i].Estatus,archivoHOE[i].ID_User_Asignado);
                    arr.push(ne);break;
                }
            }
        }
        return res.json({
            success: true,
            operation:arr,
            message: `Se devolvieron los archivos ordenados por ${req.body.colum} de manerea ${req.body.order}`
        })
            
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`documentosalone`))
        
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos `
            })
        }

    },
    documentosorderby:async(req,res)=>{

        try{
        const aux = await new sql.Request();
        switch(req.body.role){
            case 'admin':var resu = await aux.query(`select * from Documentos Where Estatus!=4 order by ${req.body.colum} ${req.body.order};`);break;
            case 'revisor':var resu = await aux.query(`select * from Documentos where Estatus!=4 and (ID_Contribuidor=${req.body.iduser} or ID_Revisor1=${req.body.iduser} or ID_Revisor2=${req.body.iduser} or ID_Revisor3=${req.body.iduser} or Estatus=1) order by ${req.body.colum} ${req.body.order};`);break;
            case 'contribuidor':var resu = await aux.query(`select * from Documentos where Estatus!=4 and (ID_Contribuidor=${req.body.iduser} or ID_Revisor1=${req.body.iduser} or ID_Revisor2=${req.body.iduser} or ID_Revisor3=${req.body.iduser} or Estatus=1) order by ${req.body.colum} ${req.body.order};`);break;
            case 'visitante':var resu = await aux.query(`select * from Documentos Where Estatus=1 order by ${req.body.colum} ${req.body.order};`);break;
            default:var resu = await aux.query(`select * from Documentos Where Estatus=1 order by ${req.body.colum} ${req.body.order};`);break;
        }
        
            
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
    
                 if(!dataFile.isDirectory()){
                    var separate = ls[j].split('Â§',1).toString();
                    var id = Number(separate.split('§',1));
                    var name = ls[j].split('§').pop();
                    if(archivoHOE[i].ID_DOC==id){
                        var ne = new documentor(id,name, ls[j].split(".").pop(),`${urls}${ls[j]}`,dataFile.isDirectory(),archivoHOE[i].HOE_Code,archivoHOE[i].Document_Type_Hoe,"calidad","press",archivoHOE[i].No_Rev,"Ingles","2022-05-05",2,archivoHOE[i].Fecha_Modificacion,archivoHOE[i].ID_Revisor1,archivoHOE[i].ID_Revisor2,archivoHOE[i].ID_Revisor3,archivoHOE[i].ID_UserModifico,archivoHOE[i].Estatus);
                        arr.push(ne);break;
                        
                    }
                    
                }
            }
        }

        var carpetas = await aux.query(`select * from Carpeta order by ID_C desc;`);
        var car= carpetas.recordset;

        for(var i=0;i<car.length;i++){

            for(var j=0;j<ls.length;j++){
                const file  = path.join(`./uploads/${req.body.ruta}`,ls[j]);
                var dataFile =null;

                try{
                    dataFile =fs2.lstatSync(file);
                }catch(e){}
                
                if(dataFile.isDirectory() && car[i].Nombre==ls[j].split('§').pop()){
                    var ne = new documentor(car[i].ID_C,car[i].Nombre,'',`${urls}${ls[j]}`,dataFile.isDirectory(),"PCQ0110-01","procedure","calidad","press","N","spanish","2022-05-05",2,"november 10,21",0,0,0,0,0);
                    arr.unshift(ne);
                }
            }
        }
 
        return res.json({
            success: true,
            operation:arr,
            message: `Se devolvieron los archivos ordenados por ${req.body.colum} de manerea ${req.body.order}`
        })
        
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`documentosorderby`))
            console.log(e);
    
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

    getflujoid:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`select * from Flujo_Trabajo where ID_Doc=${req.body.idoc};`)
            
        if(!resu){
            return res.json({
                success: false,
                response:null,
                message: `no se encontro el flujo con ID_DOC = ${req.body.idoc}`
            })
        }
    
        return res.json({
            success: true,
            response:resu.recordset,
            message: `Flujo Encontrado con ID_DOC = ${req.body.idoc}!!`
        })
    
        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`getflujoid`))
    
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> getflujoid`
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

    reportsgrafics: async (req,res)=>{

        // try{
            const fs = require('fs');
            const urls = `http://localhost:4000/uploads/`;

            function document(url,dir,ID_DOC,ID_Contribuidor,Nombre,Extension,No_Rev,Doc_Actual,Fecha_Carga,Fecha_Vencimiento,Estatus_Seguimiento,Estatus,ID_Version_Anterior,ID_Version_Sig,ID_Carpeta,ID_Revisor1,ID_Revisor2,ID_Revisor3,HOE_Code,Document_Type_Hoe,ID_UserModifico,Fecha_Modificacion,Area,Shop,Lenguaje,Ane){
                this.url = url;
                this.dir = dir;
                this.ID_DOC = ID_DOC;
                this.ID_Contribuidor = ID_Contribuidor;
                this.Nombre = Nombre;
                this.Extension = Extension;
                this.No_Rev = No_Rev;
                this.Doc_Actual = Doc_Actual;
                this.Fecha_Carga = Fecha_Carga;
                this.Fecha_Vencimiento = Fecha_Vencimiento;
                this.Estatus_Seguimiento = Estatus_Seguimiento;
                this.Estatus = Estatus;
                this.ID_Version_Anterior= ID_Version_Anterior;
                this.ID_Version_Sig = ID_Version_Sig;
                this.ID_Carpeta = ID_Carpeta;
                this.ID_Revisor1 = ID_Revisor1;
                this.ID_Revisor2 = ID_Revisor2;
                this.ID_Revisor3 = ID_Revisor3;
                this.HOE_Code = HOE_Code;
                this.Document_Type_Hoe = Document_Type_Hoe;
                this.ID_UserModifico = ID_UserModifico;
                this.Fecha_Modificacion = Fecha_Modificacion;
                this.Area=Area;
                this.Shop=Shop;
                this.Lenguaje = Lenguaje;
                this.Ane = Ane;
            }
            
            const aux = await new sql.Request();
            const resu = await aux.query(`select * from Documentos where Estatus=${req.body.estatus};`);
            
            var archivoHOE =resu.recordset;
            var arr= [];
            var data=[];

            const path = require('path');

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
            
            scanDirs('./uploads');

         
    
            var carpetas = await aux.query(`select * from Carpeta order by ID_C desc;`);
            var car= carpetas.recordset;
            for(var i=0;i<car.length;i++){
    
                for(var j=0;j<ls.length;j++){
                    const file  = path.join(`./uploads/${req.body.ruta}`,ls[j]);
                    var dataFile =null;
    
                    try{
                        dataFile =fs2.lstatSync(file);
                    }catch(e){}
                    
                    if(dataFile.isDirectory() && car[i].Nombre==ls[j].split('§').pop()){
                        var ne = new documentor(car[i].ID_C,car[i].Nombre,'',`${urls}${ls[j]}`,dataFile.isDirectory(),"PCQ0110-01","procedure","calidad","press","N","spanish","2022-05-05",2,"november 10,21",0,0,0,0,0);
                        arr.unshift(ne);
                    }
                }
            }
     
            // return res.json({
            //     success: true,
            //     operation:arr,
            //     message: `Se devolvieron los archivos ordenados por ${req.body.colum} de manerea ${req.body.order}`
            // })
            
            // }catch(e){
            //     console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`documentosorderby`))
            //     console.log(e);
        
            //     return res.json({
            //     success: false,
            //     operation:e,
            //     message: `No se pudo haceer tu consulta fallo la base de datos `
            //     })
            // }


        
    }


}

module.exports = general;