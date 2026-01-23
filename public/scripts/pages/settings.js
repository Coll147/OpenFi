// === Funciones ===

async function populate(user_id) {
  let db_data = await loadDB('userdata'); 
  const userdata = db_data[0];
  db_data = null;

  document.getElementById("selector_language").value = userdata.language
  document.getElementById("selector_background").value = userdata.background
  document.getElementById("selector_theme").value = userdata.theme
  
  console.log(userdata.username)
  document.getElementById("user_name").textContent = userdata.username
  document.getElementById("user_avatar").src = `https://gravatar.com/avatar/${await sha256(userdata.email)}`
  console.log(userdata.email)
}



// === Eventos ===

if(document.getElementById('show-password')){
  document.getElementById('show-password').addEventListener('click', () => {
      const element = document.getElementById('new-passwd')
      element.type = element.type === 'password' ? 'text' : 'password'
  })
}