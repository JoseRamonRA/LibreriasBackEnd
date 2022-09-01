const sql = require('../Connection/conexion');
export async function extraerReq(){
    return await new sql.Request()
        .query('SELECT * from [dbo].[Tabla_de_Catalogo_de_Requerimientos_en_Linea]');  
}

export async function crearCarpeta(Nombre, idsuperior){
    return await new sql.Request()
    .input('nombre', sql.VarChar, Nombre)
    .input('idSuperior', sql.Int, idsuperior)
    .query('INERT INTO Carpeta (Nombre, ID_Carpeta_Superior) VALUES (@nombre, @idSuperior)');
    
}

export async function crearDocumento(IdContirbuidor,Nombre,Extension,NoRev,DocActual,FechaCarga,Estatus_Seguimiento,Estatus,idCarpeta,DocumentTypeHoe,Revisor1,Revisor2,Revisor3,HoeCode,idModifica,fechaModifica,Version_Anterior){
     return await new sql.Request()
     .input('idContribuidor', sql.Int, IdContirbuidor)
     .input('Nombre', sql.VarChar, Nombre)
     .input('Ext', sql.VarChar, Extension)
     .input('NoRev', sql.VarChar, NoRev)
     .input('DocActual', sql.Int, DocActual)
     .input('FechaC', sql.Date, FechaCarga)
     .input('EstatusS', sql.Int, Estatus_Seguimiento)
     .input('Estatus', sql.Int, Estatus)
     .input('carpeta', sql.Int, idCarpeta)
     .input('doctype', sql.VarChar, DocumentTypeHoe)
     .input('rev1', sql.Int, Revisor1)
     .input('rev2', sql.Int, Revisor2)
     .input('rev3', sql.Int, Revisor3)
     .input('hoecode', sql.VarChar, HoeCode)
     .input('idModifica', sql.Int, idModifica)
     .input('fechaModifica', sql.Date, fechaModifica)
     .input('Version_Anterior',sql.Int,Version_Anterior)
     .query('INSERT INTO Documentos (ID_UserModifico,Fecha_Modificacion,ID_Contribuidor,Nombre,Extension,No_Rev,Doc_Actual,Fecha_Carga,Estatus_Seguimiento,Estatus,ID_Carpeta,ID_Revisor1,ID_Revisor2,ID_Revisor3,HOE_Code,Document_Type_Hoe,ID_Version_Anterior) OUTPUT INSERTED.ID_DOC VALUES(@idModifica,@fechaModifica,@idContribuidor,@Nombre,@Ext,@NoRev,@DocActual,@FechaC,@EstatusS,@Estatus,@carpeta,@rev1,@rev2,@rev3,@hoecode,@doctype,@Version_Anterior)')
}   

export async function actualizarDoc(IdContirbuidor,Nombre,Extension,NoRev,DocActual,FechaCarga,FechaVencimiento,Estatus_Seguimiento,Estatus,Id_VerAnterior,IDcarpeta,DocumentTypeHoe,Revisor1,Revisor2,Revisor3,HoeCode){

}

export async function crearTarea(IdDoc,IDflujo,IdUser,FechaIni,Desc,Estatus){
    return await new sql.Request()
    .input('doc', sql.Int, IdDoc)
    .input('flujo',sql.Int,IDflujo)
    .input('userasignado',sql.Int,IdUser)
    .input('desc',sql.Text,Desc)
    .input('estatus',sql.Int,Estatus)
    .input('fechaIni',sql.Date,FechaIni)
    .query('INSERT INTO Tareas (ID_Doc,ID_User_Asignado,ID_Flujo,Descripcion,Estatus,Fecha_Inicio) VALUES (@doc,@userasignado,@flujo,@desc,@estatus,@fechaIni)');
}

export async function extraerTarea(idTarea){
     return await new sql.Request()
     .input('idtarea', sql.Int, idTarea)
     .query('SELECT * FROM Tareas WHERE ID_T = @idtarea');
}

export async function extrearTareas(IdUsuario,Estatus){
    return await new sql.Request()
    .input('idUser', sql.Int, IdUsuario)
    .input('estatus', sql.Int,Estatus)
    .query('SELECT * FROM Tareas WHERE ID_User_Asignado = @idUser and Estatus = @estatus');
}

export async function actualizarTarea(IdDoc,IdUser,Desc,Estatus,Coemnts,FechaFin){

}


export async function agregarLogs(idUser,IdDoc,Accion,Fecha){

}

export async function crearFlujo(idDoc,FechaInic,Estatus){
   return await new sql.Request()
   .input('idDoc', sql.Int, idDoc)
   .input('fechaIni', sql.Date, FechaInic)
   .input('estatus',sql.Int,Estatus)
   .query('INSERT INTO Flujo_Trabajo (ID_Doc,Fecha_Inicio, Estatus) OUTPUT INSERTED.ID_F VALUES (@idDoc,@fechaIni,@estatus)');
}

export async function actualizarFlujo(Iddoc,FechaFin,Estatus,fechaCancelo,IdUserCan,Comentarios){

}

export async function eliminarCarpeta(idCarpeta){

}

export async function renombrarCarpeta(idCarpeta,nombre){

}

export async function aprobacionDoc(id,Estatus,Estatus_Seg,IdUserM,FechaMo){
   return await new sql.Request()
   .input('ID',sql.Int, id)
   .input('estatus', sql.Int, Estatus)
   .input('estatusSeg',sql.Int, Estatus_Seg)
   .input('userModifico', sql.Int, IdUserM)
   .input('fechaModifico', sql.Date, FechaMo)
   .query('UPDATE Documentos SET Estatus = @estatus, Estatus_Seguimiento = @estatusSeg, ID_UserModifico = @userModifico, Fecha_Modificacion = @fechaModifico WHERE ID_DOC = @ID')
}
export async function rechazarDoc(id,Estatus,IdUserM,FechaMo){
    return await new sql.Request()
    .input('ID',sql.Int, id)
    .input('estatus', sql.Int, Estatus)
    .input('userModifico', sql.Int, IdUserM)
    .input('fechaModifico', sql.Date, FechaMo)
    .query('UPDATE Documentos SET Estatus = @estatus,ID_UserModifico = @userModifico, Fecha_Modificacion = @fechaModifico WHERE ID_DOC = @ID')
 }
export async function rechazarFlujo(id, fechaCan,idUserCan,estatus,coments){
   return await new sql.Request()
   .input('idf', sql.Int, id)
   .input('fecha', sql.Date, fechaCan)
   .input('usuario', sql.Int, idUserCan)
   .input('estatus', sql.Int, estatus)
   .input('coments', sql.Text, coments)
   .query('UPDATE Flujo_Trabajo SET Fecha_Cancelacion = @fecha, ID_User_Cancelo = @usuario, Estatus = @estatus, Comentarios = @coments WHERE ID_F = @idf')
}

export async function finalizarFlujo(id, fechaFin,estatus,coments){
    return await new sql.Request()
    .input('idf', sql.Int, id)
    .input('fecha', sql.Date, fechaFin)
    .input('estatus', sql.Int, estatus)
    .input('coments', sql.Text, coments)
    .query('UPDATE Flujo_Trabajo SET Fecha_Fin = @fecha, Estatus = @estatus, Comentarios = @coments WHERE ID_F = @idf')
 }

 export async function aprobacionTarea(id, fechaFin,estatus,coments){
    return await new sql.Request()
    .input('idf', sql.Int, id)
    .input('fecha', sql.Date, fechaFin)
    .input('estatus', sql.Int, estatus)
    .input('coments', sql.Text, coments)
    .query('UPDATE Tareas SET Fecha_Fin = @fecha, Estatus = @estatus, Comentarios = @coments WHERE ID_T = @idf')
 }

export async function infoDocumento(iddoc){
     return await new sql.Request()
     .input('iddoc', sql.Int, iddoc)
     .query('SELECT * FROM Documentos where ID_DOC = @iddoc');
 }

 export async function infoDocumentos(){
    return await new sql.Request()
    .query('SELECT * FROM Documentos');
}