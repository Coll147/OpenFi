// === Funciones globales ===
async function loadTheme(){
  const db_data = await loadDB('userdata');
  const preferences = db_data[0]; // Assuming single user or first row

  if (!preferences || !preferences.theme) {
    console.log('No theme preferences found, using default light theme');
    // Let the user something is wrong
    document.documentElement.style.setProperty('--bg-color', '#ff0000');
    document.documentElement.style.setProperty('--sb-color', '#000000');
    document.documentElement.style.setProperty('--text-color', '#000000');
    document.documentElement.style.setProperty('--card-bg', '#0f37eb');
    document.documentElement.style.setProperty('--table-head', '#e0e0e0');
    document.documentElement.style.setProperty('--table-body', '#6b2e2e');
    document.getElementById('openfi-logo').src = '/assets/dark-logo.png';
    return;
  }

  if (preferences.theme === 'system') {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
      console.log("El navegador está en modo oscuro");
      document.documentElement.style.setProperty('--bg-color', '#6b6b6b');
      document.documentElement.style.setProperty('--sb-color', '#474747');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
      document.documentElement.style.setProperty('--card-bg', '#4e4e4e');
      document.documentElement.style.setProperty('--table-head', '#5a5a5a');
      document.documentElement.style.setProperty('--table-body', '#707070');
      document.getElementById('openfi-logo').src = '/assets/logo.png'
    } 
    else {
      console.log("El navegador está en modo claro");
      document.documentElement.style.setProperty('--bg-color', '#ffffff');
      document.documentElement.style.setProperty('--sb-color', '#f0f0f0');
      document.documentElement.style.setProperty('--text-color', '#000000');
      document.documentElement.style.setProperty('--card-bg', '#f9f9f9');
      document.documentElement.style.setProperty('--table-head', '#e0e0e0');
      document.documentElement.style.setProperty('--table-body', '#ffffff');
      document.getElementById('openfi-logo').src = '/assets/dark-logo.png'
    }
  }
  else if (preferences.theme === 'dark'){
    document.documentElement.style.setProperty('--bg-color', '#6b6b6b');
    document.documentElement.style.setProperty('--sb-color', '#474747');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--card-bg', '#4e4e4e');
    document.documentElement.style.setProperty('--table-head', '#5a5a5a');
    document.documentElement.style.setProperty('--table-body', '#707070');
    document.getElementById('openfi-logo').src = '/assets/logo.png'
  }
  else if (preferences.theme === 'light') {
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--sb-color', '#f0f0f0');
    document.documentElement.style.setProperty('--text-color', '#000000');
    document.documentElement.style.setProperty('--card-bg', '#f9f9f9');
    document.documentElement.style.setProperty('--table-head', '#e0e0e0');
    document.documentElement.style.setProperty('--table-body', '#ffffff');
    document.getElementById('openfi-logo').src = '/assets/dark-logo.png'
  }
  
}
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
});


async function loadDB(table, column, value) {
  const res = await fetch('/api/storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: table, column: column, value: value})
  });

  const data = await res.json();

  console.log(data);

  return(data)
}



async function writeDB(table, column, value, pk, id) {
  const res = await fetch('/api/storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: table, column: column, value: value, pk: pk, id: id})
  });

  const data = await res.json();

  console.log(data);

  return(data)
}



async function removeDB(table, pk, id) {
  const res = await fetch('/api/storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: table, pk: pk, id: id})
  });

  const data = await res.json();

  console.log(data);

  return(data)
}



async function sha256(value) {
  const res = await fetch('/api/hash', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  });

  const data = await res.json();
  const hash = data.hash;

  console.log('to hash > ' + value)
  console.log('hashed > ' + hash);

  return(hash)
}



// logs.js (frontend)
async function log(event, device, risk, info) {
  try {
    const payload = {
      logEvent: event,
      logDevice: device,
      logRisk: risk,
      logInfo: info
    };

    const response = await fetch('/api/storage/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Nuevo log añadido con ID:', result.id);
      return result.id;
    } else {
      console.error('Error al añadir log:', result.error);
    }
  } catch (err) {
    console.error('Error de conexión al log:', err);
  }
}