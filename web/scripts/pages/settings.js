// Load fields
async function populate(user_id) {
  let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

  document.getElementById("selector_language").value = account[user_id].language
  document.getElementById("selector_background").value = account[user_id].background
  document.getElementById("selector_theme").value = account[user_id].theme
  
  console.log(account[user_id].username)
  document.getElementById("user_name").textContent = account[user_id].username
  document.getElementById("user_avatar").src = `https://gravatar.com/avatar/${await sha256(account[user_id].email)}`
  console.log(account[user_id].email)
}

document.getElementById('show-password').addEventListener('click', () => {
    const element = document.getElementById('new-passwd')
    element.type = element.type === 'password' ? 'text' : 'password'
})

// Funcion usada para cambiar contraseña
function changeValueSHA(user_id, element, db_value) {
  let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

  const contenido = document.getElementById(element).value

  console.log(`Old ${db_value}: ${account[user_id][db_value]} || Nueva ${db_value}: ${account[user_id][db_value]}`)
  log(`${db_value} changed`, `OpenFi Account`, 'Warn', `${db_value} de ${account[0].username} has been changed.`)

  account[user_id][db_value] = sha256(contenido)

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