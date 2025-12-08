// Loguear un evento
function log(event, device, risk, info){
    const ahora = new Date();

    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11
    const ano = ahora.getFullYear();

    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');

    const time = `${dia}-${mes}-${ano} ${horas}:${minutos}`;

    console.log("Fecha y hora actual:", fechaHoraActual);
}