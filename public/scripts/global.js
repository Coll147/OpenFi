// === Funciones globales ===
async function loadTheme(){
  const preferences = await loadDB('userdata');
  
  document.documentElement.style.setProperty('--bg-color', '#6b6b6b');
  document.documentElement.style.setProperty('--sb-color', '#474747');
  document.documentElement.style.setProperty('--text-color', '#ffffff');
  document.documentElement.style.setProperty('--card-bg', '#4e4e4e');
  document.documentElement.style.setProperty('--table-head', '#5a5a5a');
  document.documentElement.style.setProperty('--table-body', '#707070');
}
loadTheme()


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