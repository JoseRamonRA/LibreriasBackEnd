import sql from '../Connection/conexion';
const chalk = require('chalk');
const DBUser = '[BDCDMSUsuarios].[dbo].';


const users ={
    hellousers:async (req,res)=>{
        res.json("Hola estamos en usuarios")
    },

    getGroups:async (req,res)=>{
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`SELECT * FROM ${DBUser}[GRUPOS]`);

            if(!resu){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }

            return res.json({
                success: true,
                operation:resu.recordset,
                message: "Groups Founds!!"
            })

        }catch(e){
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`getGroups`))

                return res.json({
                success: false,
                operation:e,
                message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> getGroups`
                })
        }

    },

    InsertGrupo:async (req,res)=>{
        console.log(req.body)
        try{
            const aux = await new sql.Request();
            const resu = await aux.query(`EXEC [BDCDMSUsuarios].[dbo].[InsertGrup] '${req.body.name}','${req.body.desc}',${req.body.UserCreate},${req.body.admn},${req.body.read},${req.body.cont},${req.body.revi},${req.body.apro};`)

            var x = resu.recordset[0];

            const addColum = await aux.query(`ALTER TABLE [BDCDMSUsuarios].[dbo].[Usuarios] ADD [Grupo${x.LAST_ID}] [BIT] NULL;`)

            
            if(!resu || !addColum){
                return res.json({
                    success: false,
                    operation:resu.rowsAffected,
                    message: "Mo se completo la operacion"
                })
            }
    
            return res.json({
                success: true,
                operation:resu.rowsAffected,
                message: "group and column users successfully added!!"
            })
    
        }catch(e){
                console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`InsertGrupo`))
                console.log(e)
                return res.json({
                success: false,
                operation:e,
                message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> InsertGrupo`
                })
        }

    },
    searchgroup:async(req,res)=>{
        try{
            const aux = await new sql.Request(); 
            const resu = await aux.query(`select * from [BDCDMSUsuarios].[dbo].[Grupos] where ID_G=${req.body.idgroup};`);

        if(!resu){
            return res.json({
                success: false,
                message: "Mo se completo la operacion"
            })
        }
    
        return res.json({
            success: true,
            operation:resu.recordset,
            message: "Group found!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`searchgroup`))
            console.log(e);
            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> searchgroup`
            })
        }
    },

    updategroup:async(req,res)=>{

        console.log(req.body)
        try{
            const aux = await new sql.Request(); 
            const resu = await aux.query(`update [BDCDMSUsuarios].[dbo].[Grupos] set Nombre = '${req.body.name}', Descripcion='${req.body.desc}', Administrador=${req.body.admn} , ReadF=${req.body.read}, Contribuidor=${req.body.cont} , Revisor=${req.body.revi} , Aprobador=${req.body.apro} where ID_G=${req.body.idgro}`);

        if(!resu){
            return res.json({
                success: false,
                message: "Mo se completo la operacion"
            })
        }
    
        return res.json({
            success: true,
            operation:resu.recordset,
            message: "Group update!!"
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


    deletegroup:async (req,res)=>{
        try{
            const aux = await new sql.Request(); 
            const resu1 = await aux.query(`DELETE FROM [BDCDMSUsuarios].[dbo].[Grupos] WHERE ID_G=${req.body.idgrp} ;`);
            const resu2 = await aux.query(`ALTER TABLE [BDCDMSUsuarios].[dbo].[Usuarios] DROP COLUMN Grupo${req.body.idgrp};`);
            const resu3 = await aux.query(`DELETE FROM Carpeta_Grupo WHERE ID_G =${req.body.idgrp};`);
            
        if(!resu1 || !resu2 || !resu3){
            return res.json({
                success: false,
                message: "Mo se completo la operacion"
            })
        }
    
        return res.json({
            success: true,
            operation:resu1.recordset,
            message: "Delate Group!!"
        })

        }catch(e){
            console.log(chalk.red(`Existe error en la base de datos o no se completo la operacion`),chalk.bgHex("#000").hex("#00EBAE").bold(`deletegroup`))
            console.log(e);

            return res.json({
            success: false,
            operation:e,
            message: `No se pudo haceer tu consulta fallo la base de datos para la operacion ==> deletegroup`
            })
        }
    }

}

module.exports = users;