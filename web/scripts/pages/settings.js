// Load fields
function populate(user_id) {
  let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

  document.getElementById("selector_language").value = account[user_id].language
  document.getElementById("selector_background").value = account[user_id].background
  document.getElementById("selector_theme").value = account[user_id].theme
  
  console.log(account[user_id].username)
  document.getElementById("user_name").textContent = account[user_id].username
  document.getElementById("user_avatar").src = account[user_id].avatar
}


// Funcion usada para cambiar contraseña
function changePassword(user_id, element) {
  let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

  const contenido = document.getElementById(element).value

  console.log(`Vieja contraseña: ${account[user_id].password} || Nueva contraseña: ${contenido}`)
  log('Password changed', `OpenFi Account`, 'Warn', `La contraseña de ${account[0].username} ha sido cambiada.`)

  account[user_id].password = contenido

  localStorage.setItem("account", JSON.stringify(account)) // guardar localstorage

  window.parent.updatePage('logs', document.querySelector('.nav_menu li[data-page="logs"]'), true)
}


// Funcion usada para cambiar valor
function changeValue(user_id, element_id, db_value) {
  let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

  const contenido = document.getElementById(element_id).value
  console.log(`settings.js > changeValue: Cambiado ${db_value} a ${contenido}`)

  account[user_id][db_value] = contenido

  localStorage.setItem("account", JSON.stringify(account)) // guardar localstorage
  window.top.location.reload()

}