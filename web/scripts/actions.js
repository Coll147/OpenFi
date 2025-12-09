// Loguear un evento
function log(event, device, risk, info) {
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

    console.log("Nuevo log añadido:", newLog)
}