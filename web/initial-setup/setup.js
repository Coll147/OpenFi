document.getElementById('show-password2').addEventListener('click', () => {
    const element = document.getElementById('passwd1')
    element.type = element.type === 'password' ? 'text' : 'password'
})

function setup() {
  if (document.getElementById('passwd1').value === document.getElementById('passwd2').value) {
    console.log('contraseñas coinciden')
    changeValueSHA(0, 'passwd1', 'password') // set password
    changeValue(0, 'email-set', 'email') // set email
    log('User Setup', `OpenFi System`, 'Info', `Welcome to OpenFi`)
  } else {
    console.log('Las contraseñas no coinciden')
  }
  //window.location.href = "../login.html"
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

  log(`${db_value} changed`,'OpenFi Account','Warn',`${db_value} de ${account[user_id].username} ha sido configurada.`)

  console.log('Password updated correctly')
  console.log(`Old ${db_value}: ${oldValue}`)
  console.log(`New ${db_value}: ${newHash}`)
}



// Funcion usada para cambiar valor
function changeValue(user_id, element_id, db_value) {
  let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage

  const contenido = document.getElementById(element_id).value
  if (contenido == undefined) { 
    console.error('Contenido vacío')
    return 
  }
  console.log(`setup.js > changeValue: Cambiado ${db_value} a ${contenido}`)

  account[user_id][db_value] = contenido

  localStorage.setItem("account", JSON.stringify(account)) // guardar localstorage
}