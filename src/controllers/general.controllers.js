const chalk = require('chalk');
const res = require('express/lib/response');
const path = require ('path');
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
                
                    var ne = new person(dat[1], ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),archivoHOE.HOE_Code,archivoHOE.Document_Type_Hoe,"calidad","press",archivoHOE.No_Rev,"Ingles","2022-05-05",2,archivoHOE.Fecha_Modificacion,archivoHOE.ID_Revisor1,archivoHOE.ID_Revisor2,archivoHOE.ID_Revisor3,archivoHOE.ID_UserModifico,archivoHOE.Estatus);
                    arr.push(ne);
                }else{
                    var ne = new person(ls[i].split(".",1).toString(), ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),"PCQ0110-01","procedure","calidad","press","N","spanish","2022-05-05",2,"november 10,21",0,0,0,0,0);
                    arr.push(ne);
                }
                
             }
        }
        
        function person(nam,ext,url,dir,cod,tdo,are,sho,nor,len,fev,ane,mod,rev1,rev2,rev3,modifica,estatus){
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

        var ls =fs2.readdirSync(`./uploads/${req.body.ruta}`);

        for(var i=0;i<ls.length;i++){
            const file  = path.join(`./uploads/${req.body.ruta}`,ls[i]);
            var dataFile =null;

            try{
               dataFile =fs2.lstatSync(file);
            }catch(e){}

            if(dataFile){
                var ne = new person(ls[i].split(".",1).toString(), ls[i].split(".").pop(),`${urls}${ls[i]}`,dataFile.isDirectory(),"PCQ0110-01","procedure","calidad","press","#154546","spanish","2022-05-05",2,"nomvember 10,21");
                arr.push(ne);
             }
        }
        
        function person(nam,ext,url,dir,cod,tdo,are,sho,nor,len,fev,ane,mod){
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

        console.log(name,ext,old,"ruta=",rut)

        if(ext != 'pdf' && ext!='docx' && ext!="doc" && ext!="xlsx" && ext!="xls" && ext!="jpg" && ext!="png"){
            ext="";
        }else{
            ext="."+ext;
        }

        const fs = require('fs');
        console.log(name);
        fs.rename(`./uploads/${rut}${old}${ext}`, `./uploads/${rut}${name}${ext}`, (err) => {
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
    }




}

module.exports = general;