// Funcion usada para cambiar el nickname de un dispositivo
function changeNick(index) {
    console.log(index)

    const contenido = document.getElementById("device-nick").value

    console.log(`Nombre de ${devices[index].model} cambiado de ${devices[index].nickname} a ${contenido}`)
    devices[index].nickname = contenido

    // recargar tabla
    loadTable()
}