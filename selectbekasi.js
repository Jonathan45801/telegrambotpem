const config = require('./connect.js')
const Mysqli = require('mysql')
const {Client}  = require('ssh2');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');

//let connection = new Mysqli(config.connection);

let connection = Mysqli.createConnection(config.connection);
function connectdatabase(callback)
{
    let message = "";
    connection.connect(function(err) {
        if (err) {
            message = "error connecting: "+err.stack;
          console.error('error connecting: ' + err.stack);
          return callback(message);
        }
      message = "connected";
       console.log('connected as id ' + connection.threadId);
      });
      connection.end();
      return callback(message);
}
function selectdatapermohonan(nopermohonan,callback)
{
    // console.log(nopermohonan);
    // //let db = connection.emit();
    let query=`select nama_pemohon,no_telp,nama_aktivitas from vw_show_permohonan_all where no_permohonan = ?`;
    var message;
    connection.query(query,[nopermohonan],(error, results, fields) => {
        if (error) {
            message = error.message;
          return callback(error.message);
          
        }
        //console.log("Nama: " +results[0].nama_pemohon+"\n"+ "No_telpon: "+results[0].no_telp+"\n"+"status: "+results[0].nama_aktivitas);
        //message= "Nama: " +results[0].nama_pemohon+"\n"+ "No_telpon: "+results[0].no_telp+"\n"+"status: "+results[0].nama_aktivitas;
        return callback("Nama: " +results[0].nama_pemohon+"\n"+ "No_telpon: "+results[0].no_telp+"\n"+"status: "+results[0].nama_aktivitas);
        //console.log(results[0].nama_pemohon);
      });
      connection.end();
    /*
        db.query(query).then(result=>{
            
            console.log(query)
            if(error)
            {
                console.log(result);
                return console.error(error.message);
            }
            console.log(result);
        })

    */
}

module.exports={selectdatapermohonan,connectdatabase};