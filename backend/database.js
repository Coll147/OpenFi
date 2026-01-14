const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: '', // mejor poner contraseña
  database: 'openfi'
});

conexion.connect(err => {
if (err) {
  console.error('Error conexión:', err.message);
  process.exit(1);
}
  console.log('Conexión OK con mysql2');
});


const usuario = "SELECT * FROM devices";
  conexion.query(usuario,function(error,rows){
  if(error){
    throw error;
  }
  else{
    console.log(rows)
  }
});


function addValue(name, model) {
  conexion.query("SELECT MAX(id) AS maxId FROM devices", function(error, rows) {
    if (error) throw error;

    const nextId = (rows[0].maxId || 0) + 1;

    const nuevoreg = "INSERT INTO devices (id, name, model) VALUES (?, ?, ?)";
    conexion.query(nuevoreg, [nextId, name, model], function(error) {
      if (error) throw error;
      console.log('Datos registrados');
    });
  });
}

addValue('Gateway', 'Ubiquiti Edgerouter 4');


setTimeout(() => conexion.end(), 100);