function loadTable(){ // Creación de la tabla - de redes

  const value = JSON.parse(localStorage.getItem("networks")) // cargar localstorage
  const tabla = document.getElementById("networks-tbody")

  // Limpiar si hay cosas
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild)
  }

  // Crear filas de la tabla
  for (let i = 0; i < value.length; i++) {

  let tr = document.createElement("tr")

    let td1 = document.createElement("td") // Name
    td1.textContent = value[i].name
    tr.appendChild(td1)
    
    let td2 = document.createElement("td") // Router
    td2.textContent = value[i].router
    tr.appendChild(td2)

    let td3 = document.createElement("td") // Subnet
    td3.textContent = value[i].subnet
    tr.appendChild(td3)

    let td4 = document.createElement("td") // Concesions
    td4.textContent = value[i].concesions
    tr.appendChild(td4)


    tabla.addEventListener("click", (event) => {
      event.stopPropagation()
    })

    tr.addEventListener("click", (event) => {
      mountMenu(i)
      event.stopPropagation()
    })
    tabla.appendChild(tr)
  }
}




function toggleMenu() {
    // Enseñar menú
    const table = document.getElementById("context-menu")
    const actualState = table.style.display

    switch (actualState){
      case "none":
        table.style.display = "block"
        break;

        case "block":
          table.style.display = "none"
          while (table.firstChild) {
            table.removeChild(table.firstChild)
          }
          break;

        default:
          console.log('network.js > toogleMenu > Error al cambiar, valor inesperado')
          console.log(actualState)
    }
}

function mountMenu(index){ // Mostrar menú extra de cada dispositivo
  let value = JSON.parse(localStorage.getItem("networks")) // cargar localstorage

  let aside = document.getElementById("context-menu")

  // Nombre de la red
  let h2 = document.createElement('h2')
  h2.textContent = `${networks[index].name}`
  aside.appendChild(h2)

  // Tabla de datos
  let tbody = document.createElement("tbody")
  let tr = ""
  let td1 = ""
  let td2 = ""

  tr = document.createElement("tr") // IPv4 CIDR / IP del gateway
    td1 = document.createElement("td") 
    td1.textContent = 'Gateway IP'
    tr.appendChild(td1)

    td2 = document.createElement("td") 
    td2.textContent = networks[index].gateway
    tr.appendChild(td2)
  tbody.appendChild(tr)

  tr = document.createElement("tr") // IPv4 de broadcast
    td1 = document.createElement("td") 
    td1.textContent = 'Broadcast'
    tr.appendChild(td1)

    td2 = document.createElement("td") 
    td2.textContent = value[index].ipBroadcast
    tr.appendChild(td2)
  tbody.appendChild(tr)

  tr = document.createElement("tr") // Available IPs
    td1 = document.createElement("td") 
    td1.textContent = 'Available IPs'
    tr.appendChild(td1)

    td2 = document.createElement("td") 
    td2.textContent = value[index].ipAvailable
    tr.appendChild(td2)
  tbody.appendChild(tr)

  tr = document.createElement("tr") // Usable IP Range
    td1 = document.createElement("td") 
    td1.textContent = 'Usable IPs'
    tr.appendChild(td1)

    td2 = document.createElement("td") 
    td2.textContent = value[index].ipRange
    tr.appendChild(td2)
  tbody.appendChild(tr)

  tr = document.createElement("tr") // Subnet Mask
    td1 = document.createElement("td") 
    td1.textContent = 'Subnet Mask'
    tr.appendChild(td1)

    td2 = document.createElement("td") 
    td2.textContent = value[index].subnetMask
    tr.appendChild(td2)
  tbody.appendChild(tr)

  tr = document.createElement("tr") // DHCP Pool
    td1 = document.createElement("td") 
    td1.textContent = 'DHCP Pool'
    tr.appendChild(td1)

    td2 = document.createElement("td") 
    td2.textContent = value[index].dhcpPool
    tr.appendChild(td2)
  tbody.appendChild(tr)

  tr = document.createElement("tr") // DHCP Range
    td1 = document.createElement("td") 
    td1.textContent = 'DHCP Range'
    tr.appendChild(td1)

    td2 = document.createElement("td") 
    td2.textContent = value[index].dhcpRange
    tr.appendChild(td2)
  tbody.appendChild(tr)



    aside.addEventListener("click", (event) => {
      event.stopPropagation()
    })

    tr.addEventListener("click", (event) => {
      mountMenu(i)
      event.stopPropagation()
    })

    tbody.appendChild(tr)
    aside.appendChild(tbody)


  aside.addEventListener("click", (event) => {
    event.stopPropagation()
  })

  toggleMenu()
}

// Cerrar menús secundarios al pulsar dondesea
document.body.addEventListener("click", function(data) {
    console.log("Hiciste click en alguna parte del body");
    toggleMenu(false)
})