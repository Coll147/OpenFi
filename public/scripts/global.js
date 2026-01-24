// === Funciones globales ===

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