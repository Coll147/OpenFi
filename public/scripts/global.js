// === Funciones globales ===

async function loadDB(table, key, value) {
  const res = await fetch('/api/storage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: 'userdata' })
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

  console.log(value)
  console.log(hash);

  return(hash)
}