// === Funciones globales ===
async function loadTheme(){
  const preferences = await loadDB('userdata');
  
  document.documentElement.style.setProperty('--bg-color', '#6b6b6b');
  document.documentElement.style.setProperty('--sb-color', '#474747');
  document.documentElement.style.setProperty('--text-color', '#ffffff');
  document.documentElement.style.setProperty('--card-bg', '#4e4e4e');
  document.documentElement.style.setProperty('--table-head', '#5a5a5a');
  document.documentElement.style.setProperty('--table-body', '#707070');
}
loadTheme()


async function loadDB(table, column, value) {
  const res = await fetch('/api/storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: table, column: column, value: value})
  });

  const data = await res.json();

  console.log(data);

  return(data)
}



async function writeDB(table, column, value, pk, id) {
  const res = await fetch('/api/storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: table, column: column, value: value, pk: pk, id: id})
  });

  const data = await res.json();

  console.log(data);

  return(data)
}



async function sha256(value) {
  const res = await fetch('/api/hash', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  });

  const data = await res.json();
  const hash = data.hash;

  console.log('to hash > ' + value)
  console.log('hashed > ' + hash);

  return(hash)
}



// Theme system
function setTheme() {
  const account = JSON.parse(localStorage.getItem("account")) // cargar localstorage
  user_id=0
  if (account[user_id].theme === "dark") {
    document.documentElement.style.setProperty('--bg-color', '#6b6b6b');
    document.documentElement.style.setProperty('--sb-color', '#474747');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--card-bg', '#4e4e4e');
    document.documentElement.style.setProperty('--table-head', '#5a5a5a');
    document.documentElement.style.setProperty('--table-body', '#707070');

    if (document.getElementById('openfi-logo')){
      document.getElementById('openfi-logo').src = "assets/logo.png"
    }
    
  }
  else if (account[user_id].theme === "light") {
    document.documentElement.style.setProperty('--bg-color', '#ffffffff');
    document.documentElement.style.setProperty('--sb-color', '#abababff');
    document.documentElement.style.setProperty('--text-color', '#000000ff');
    document.documentElement.style.setProperty('--card-bg', 'peru');
    document.documentElement.style.setProperty('--table-head', '#ffc8c5ff');
    document.documentElement.style.setProperty('--table-body', '#aaffb0ff');

    if (document.getElementById('openfi-logo')){
      document.getElementById('openfi-logo').src = "assets/dark-logo.png"
    }
  }
  else {
    console.error(`> actions.js > setTheme: Tema ${account[user_id].theme} no reconocido.`)
  }
  
}

document.addEventListener('DOMContentLoaded', () => {
  setTheme();
});

// Loguear un evento
function log(event, device, risk, info) {
    let logs = JSON.parse(localStorage.getItem("logs")) // cargar localstorage

    // Tomar fecha actual
    const ahora = new Date()

    const dia = String(ahora.getDate()).padStart(2, '0')
    const mes = String(ahora.getMonth() + 1).padStart(2, '0') // Meses 0-11
    const ano = ahora.getFullYear()

    const horas = String(ahora.getHours()).padStart(2, '0')
    const minutos = String(ahora.getMinutes()).padStart(2, '0')

    const time = `${dia}-${mes}-${ano} ${horas}:${minutos}`

    // Crear un nuevo log
    const newLog = {
        id: logs.length + 1, // Siguiente ID, inutil por ahora pero ok
        type: event,
        device: device,
        time: time,
        risk: risk,
        info: info,
        comments: ""
    };

    // Añadir al array
    logs.unshift(newLog)

    localStorage.setItem("logs", JSON.stringify(logs)) // guardar localstorage
    console.log("Nuevo log añadido:", newLog)
}

function parseDate(str) {
  // Ejemplo de str: "15-12-2025 18:43"

  // Separar fecha y hora
  const partes = str.split(" ");        // ["15-12-2025", "18:43"]
  const fecha = partes[0];              // "15-12-2025"
  const hora = partes[1];               // "18:43"

  // Separar día, mes y año
  const fechaPartes = fecha.split("-"); // ["15", "12", "2025"]
  const dia = Number(fechaPartes[0]);
  const mes = Number(fechaPartes[1]) - 1; // JS usa 0 = enero
  const año = Number(fechaPartes[2]);

  // Separar horas y minutos
  const horaPartes = hora.split(":");   // ["18", "43"]
  const horas = Number(horaPartes[0]);
  const minutos = Number(horaPartes[1]);

  // Crear un objeto Date de JavaScript
  return new Date(año, mes, dia, horas, minutos);
}