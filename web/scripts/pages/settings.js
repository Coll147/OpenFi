// Funcion usada para cambiar contraseña
function changePassword(id) {
    let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

    const contenido = document.getElementById(id).value

    console.log(`Vieja contraseña: ${account[0].password} || Nueva contraseña: ${contenido}`)
    log('Password changed', `OpenFi Account`, 'Warn', `La contraseña de ${account[0].username} ha sido cambiada.`)

    account[0].password = contenido

    // recargar tabla
    localStorage.setItem("devices", JSON.stringify(devices)) // guardar localstorage
}