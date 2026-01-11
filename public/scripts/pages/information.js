// 1. Usamos fetch() para solicitar el archivo JSON
function cargarDatosJSON() {
fetch('https://api.github.com/repos/coll147/OpenFi/commits')

  // 2. Primer .then(): La petición fue exitosa. La respuesta aún es
  .then(response => {
    // Verificamos si la respuesta fue OK (codigo 200-299)
    if (!response.ok){
      // Si hay un error (ej. 404. No encontrado), lanzamos una excepción
      throw new Error('Error al cargar el archivo JSON: ' + response.statusText)
      }
      return response.json()
    })

  // 3. Segundo .then(): Recibimos el objeto (los datos listos para usar)
  .then(datos => {
    lastCommit = datos[0] 
    console.log(lastCommit)

    document.getElementById('commitAuthor').textContent = lastCommit.author.login
    document.getElementById('commitAuthor').href = lastCommit.author.html_url

    document.getElementById('commitId').textContent = lastCommit.sha.slice(0,6)
    document.getElementById('commitId').href = lastCommit.html_url

    document.getElementById('commitName').textContent = lastCommit.commit.message
  })

  // 4. catch(): Captura cualquier error que ocurra durante la peticion o la conversión
  .catch(error => {
    console.error('Hubo un problema con la operación fetch: ', error)
    // Mensaje de error visible para el usuario si falla
  })
}

cargarDatosJSON() // Llamar la función