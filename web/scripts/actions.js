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
