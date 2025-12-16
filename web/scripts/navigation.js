// Detectar la base de la ruta (GitHub Pages o local)
let BASE_PATH = window.location.pathname.startsWith('/OpenFi') ? '/OpenFi' : '/web'


// Actualizar contenido
function updatePage(page, element, push = true) {
  // Actualizar iframe
  const frame = document.getElementById('content-frame')
  const src = `${BASE_PATH}/dashboard/${page}.html`
  frame.contentWindow.location.replace(src)

  // Actualizar NAV
  document.querySelectorAll('.nav_menu li').forEach(l => l.classList.remove('active'))
  if (element) element.classList.add('active')

  // Actualizar URL
  if (push) { // solo cuando se navegue (no direct load)
    history.pushState({ page: page },  "", `${BASE_PATH}/main.html?page=${page}`)
  }

  // Ajustar CSS
  window.addEventListener("DOMContentLoaded", () => { setTheme() })
}


// Listener de click en los elementos del nav
document.querySelectorAll('.nav_menu li').forEach(link => {
  link.addEventListener('click', function(e) { // listener en el click
    e.preventDefault()

    const page = this.dataset.page
    console.log(this)
    console.log(page)
    updatePage(page, this, true)
  })
})


// Soporte para botón atrás/adelante del navegador
window.addEventListener("popstate", e => {
  const page = e.state?.page || "dashboard"
  const li = document.querySelector(`.menu li[data-page="${page}"]`)

  updatePage(page, li, false)
})


// Cargar página inicial si llega desde URL completa (con el ?)
  window.addEventListener("DOMContentLoaded", () => { // cuando cargue el dom
    
  const url = new URLSearchParams(window.location.search)
  const page = url.get("page") || "dashboard"
  
  const li = document.querySelector(`.nav_menu li[data-page="${page}"]`)
  updatePage(page, li, false)
  console.log(page, li, false)
})