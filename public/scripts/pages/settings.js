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

if(document.getElementById('show-password')){
  document.getElementById('show-password').addEventListener('click', () => {
      const element = document.getElementById('new-passwd')
      element.type = element.type === 'password' ? 'text' : 'password'
  })
}


// Funcion que guarda hash - solo se usa para la contraseña por ahora
async function changeValueSHA(user_id, element, db_value) {
  let account = JSON.parse(localStorage.getItem("account"))

  const contenido = document.getElementById(element)?.value
  if (!contenido) {
    console.error('Contenido vacío')
    document.getElementById('settingsPaswdchgAlertbox').textContent = 'Contenido vacío'
    document.getElementById('settingsPaswdchgAlertbox').style.color = 'red'
    return
  }

  const oldValue = account[user_id][db_value]
  const newHash = await sha256(contenido)

  console.log(`Old ${db_value}: ${oldValue}`)
  console.log(`New ${db_value}: ${newHash}`)

  account[user_id][db_value] = newHash

  localStorage.setItem("account", JSON.stringify(account))

  log(`${db_value} changed`,'OpenFi Account','Warn',`${db_value} de ${account[user_id].username} ha sido cambiada.`)

  console.log('Password updated correctly')
  console.log(`Old ${db_value}: ${oldValue}`)
  console.log(`New ${db_value}: ${newHash}`)
  window.parent.updatePage('logs', document.querySelector('.nav_menu li[data-page="logs"]'), true)
}



// Funcion usada para cambiar valor
function changeValue(user_id, element_id, db_value) {
  let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

  const contenido = document.getElementById(element_id).value
  if (contenido == undefined) { 
    console.error('Contenido vacío')
    return 
  }
  console.log(`settings.js > changeValue: Cambiado ${db_value} a ${contenido}`)

  account[user_id][db_value] = contenido

  localStorage.setItem("account", JSON.stringify(account)) // guardar localstorage
  window.top.location.reload()
}