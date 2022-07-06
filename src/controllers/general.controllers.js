const chalk = require('chalk');
const res = require('express/lib/response');
const path = require ('path');

import e from 'express';
import sql from '../Conexion/conexion';

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

    postrute: async (req,res)=>{
        
        console.log(req.body.ruta);

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
        var ext = req.body.ext;
        var rut = req.body.rut;
        var dir = req.body.dir;

        if(rut==""){
            rut="";
        }else{
            rut = rut+"/";
        }
        console.log(name,ext,rut,dir)

        if(ext != 'pdf' && ext!='docx' && ext!="doc" && ext!="xlsx" && ext!="xls" && ext!="jpg" && ext!="png"){
            ext="";
        }else{
            ext="."+ext;
        }

        
        const fs=require("fs");
        const p=require("path");
        let path=p.join(`./uploads/${rut}${name}`);


        try{
            if(dir){
                deleteFolder(path);
                var mensaje = "Carpeta Eliminada"
            }else{
                fs.unlinkSync(`./uploads/${rut}${name}${ext}`);
                var mensaje = "Archivo Eliminado"
            }
        }catch(e){

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
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deleterecycle`))
    
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
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deleterecycle`))
    
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
            const resu = await aux.query(`update Documentos set Estatus=3 where ID_DOC=${req.body.id}`)
            
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
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deleterecycle`))
    
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
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deleterecycle`))
    
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
            const resu = await aux.query(`select * from Tareas where ID_Doc=${req.body.id}`)
            
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
    updatepropi:async (req,res)=>{
        try{

        console.log(req.body);

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
            const resu = await aux.query(`update encabezados set numerlu=${req.body.nume}, visible=${req.body.visi} where Id=${req.body.id};`)
            
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






}

module.exports = general;