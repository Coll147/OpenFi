function loadTable(){ // Creación de la tabla
    let logs = JSON.parse(localStorage.getItem("logs")) // cargar localstorage
    const tabla = document.getElementById("devices-tbody")

    // Limpiar si hay cosas
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild)
    }

    // Crear filas de la tabla
    for (let i = 0; i < logs.length; i++) {

        let tr = document.createElement("tr")

        tr.addEventListener("click", () => {
            toggleMenu(i) // No más boton de editar :D
        });
        
        let td0 = document.createElement("td") // Event type
        td0.textContent = logs[i].type
        tr.appendChild(td0)

        let td1 = document.createElement("td") // Device involved
        td1.textContent = logs[i].device
        tr.appendChild(td1)
        
        let td2 = document.createElement("td") // Time
        td2.textContent = logs[i].time
        tr.appendChild(td2)

        let td3 = document.createElement("td") // Risk / Importancy
        td3.textContent = logs[i].risk
        switch (logs[i].risk) {
            case 'High':
                td3.style.color = "red"
                break;

            case 'Warn':
                td3.style.color = "yellow"
                break;

            case 'Info':
                td3.style.color = "blue"
                break;
            
            default:
                td3.style.color = ""
                break;

        }
        tr.appendChild(td3)

        let td4 = document.createElement("td") // More info about that
        td4.textContent = logs[i].info
        tr.appendChild(td4)
        
        tabla.appendChild(tr)
    }
}




// Funcion usada para cambiar el texto de un evento
function changeText(index) {
    console.log(index)
    let logs = JSON.parse(localStorage.getItem("logs")) // cargar localstorage

    const contenido = document.getElementById("event-commentaries").value

    console.log(`comentario del evento ${logs[index].id} cambiado :)`)
    logs[index].comments = contenido

    // recargar tabla
    localStorage.setItem("logs", JSON.stringify(logs)) // guardar localstorage
    loadTable()
}



function toggleMenu(id){ // Mostrar menú extra de cada evento

    // Crear filas de la tabla
    let logs = JSON.parse(localStorage.getItem("logs")) // cargar localstorage
    let dataTable = document.getElementById("context-data")

    let tbody = document.createElement("tbody")

    let tr = ""
    let td1 = ""
    let td2 = ""

        tr = document.createElement("tr") // Incidence number what

            td1 = document.createElement("td")
            td1.textContent = "Number"
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            td2.textContent = logs[id].id
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        tr = document.createElement("tr") // Device that exploded

            td1 = document.createElement("td")
            td1.textContent = "Device Involved"
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            td2.textContent = logs[id].device
            tr.appendChild(td2)
        

        tbody.appendChild(tr)


        tr = document.createElement("tr") // Just text xd

            td1 = document.createElement("td")
            td2.colSpan = 2
            td1.textContent = "Comments"
            tr.appendChild(td1)

        tbody.appendChild(tr)

        tr = document.createElement("tr") // Commets about the shit it happend

            td2 = document.createElement("td")
            td2.colSpan = 2
            td2.innerHTML = `<textarea type="text" id="event-commentaries" placeholder="${logs[id].comments}" onblur="changeText(${id})">`
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        dataTable.appendChild(tbody)


        toogleMenu()


}

function toogleMenu() {
    // Enseñar menú (o no)
    const element = document.getElementById("context-menu")
    const actualState = element.style.display
    switch (actualState){
        case "none":
            element.style.display = "block"
            break;

        case "block":
            element.style.display = "none"
            while (dataTable.firstChild) {
                dataTable.removeChild(dataTable.firstChild)
            }
            break;

        default:
            console.log('logs.js > toogleMenu > Error al cambiar, valor inesperado')
            console.log(actualState)
    }
}


setTimeout(() => {
  log('Ready', 'Software', 'Info', 'Logging system is ready ;D')
  loadTable()
}, 2000)
