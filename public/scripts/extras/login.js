async function loadBackground() {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Error al cargar settings');

    const settings = await res.json();
    console.log('Settings cargados:', settings);

    const mode = settings["customization"]["login-bg"];

    if (mode === "bing") {
      const width = window.innerWidth;
      console.log(width)

      let resolution = "1920"; // default
      if (width >= 3840) resolution = "UHD";
      else if (width >= 1920) resolution = "1920";
      else if (width >= 1366) resolution = "1366";

      loginbg = `https://bing.biturl.top/?resolution=${resolution}&format=image&index=0&mkt=es-ES`;

      document.body.style.backgroundImage = `url("${loginbg}")`;

    } 
    
    else if (mode === "color") {
      loginbg = "#444444c2";
      document.body.style.backgroundColor = loginbg;
    } 
    
    else {
      console.warn("Modo desconocido, let the user know");
      document.body.style.backgroundColor = "#0400ffc2";
    }

  } catch (err) {
    console.error('Error al obtener settings:', err);
  }
}



function showText(text) {
    console.log("text function")
    const box = document.getElementById('alertBox')
    box.style.display = 'flex'

    const textCont = document.getElementById('cardText')
    textCont.textContent = text
    textCont.style.color = "#ff9898"
}


async function login() {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password_input: document.getElementById('password_input').value })
  });

  const data = await res.json();

  if (data.response === 'yes') {
    window.location.href = '/dashboard/dashboard';
    log('Log In', 'OpenFi System', 'Info', `Se ha iniciado sesión en el panel`);
  } else {
    showText('Acceso Denegado');
  }
}

document.querySelectorAll(".input-group").forEach(input => { 
    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            login(e.target.id); // fix later
        }
    });
});