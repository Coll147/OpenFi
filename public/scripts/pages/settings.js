// === Funciones ===

async function populate(user_id) {
  const db_data = await loadDB('userdata');
  const userdata = db_data[user_id];

  document.getElementById("selector_language").value = userdata.language
  document.getElementById("selector_theme").value = userdata.theme
  
  console.log(userdata.username)
  document.getElementById("user_name").textContent = userdata.username
  document.getElementById("user_avatar").src = `https://gravatar.com/avatar/${await sha256(userdata.email)}`
  console.log(userdata.email)
}

async function changeValue(input_id, key, hash) {
  let value = document.getElementById(input_id).value
  if (value === "") { 
    console.error('Contenido vacío')
    return 
  }
  console.log(`settings.js > changeValue: Cambiado a ${value}`)
console.log(value)
  if (hash === 1) {
    value = await sha256(value)
  }
console.log(value)

  const response = await writeDB('userdata', key, value, 'username', 'admin')
  console.log(response)

  window.top.location.reload()
}



// === Eventos ===

if(document.getElementById('show-password')){
  document.getElementById('show-password').addEventListener('click', () => {
      const element = document.getElementById('new-passwd')
      element.type = element.type === 'password' ? 'text' : 'password'
  })
}