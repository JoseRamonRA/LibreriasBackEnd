const sql = require('mssql');
const datos = require('../config')
var config = {
  "user": datos.user,
  "password": datos.pass,
  "server": datos.server, 
  "database": datos.database, 
  options: { 
      trustServerCertificate: true,
      },
      pool: {
        max: 5,
        min: 0
      }
}
sql.connect(config, err => { 
  if(err){
      throw err ;
  }
  console.log("Conexion realizada!")     
});
module.exports = sql;