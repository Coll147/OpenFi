// Init variables
let sortTime = "ascendente"
let riskFilter = "All"

// Ordenar por tiempo
document.getElementById('time').addEventListener('click', () => {
    const arrowElement = document.getElementById('time_arrow')

    if (arrowElement.textContent === "▲") {
        arrowElement.textContent = "▼"
        sortTime = "descendente"
    } else {
        arrowElement.textContent = "▲"
        sortTime = "ascendente"
    }

    loadTable()
    console.log(`= logs.js > filterLogs: filtrar por ${sortTime}`)
})

// Filtrar logs por importancia
function filterLogs() {
    riskFilter = document.getElementById('riskFilter').value
    console.log(`= logs.js > filterLogs: filtrar por ${riskFilter}`)
    loadTable()
}

function loadTable(){ // Creación de la tabla
    let logs = JSON.parse(localStorage.getItem("logs")) // cargar localstorage
    const tabla = document.getElementById("devices-tbody")
    if (riskFilter === undefined) riskFilter = 'All'
    if (sortTime === undefined) sortTime = 'ascendente'

    // Limpiar contenido anterior
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild)
    }

    console.log(`= logs.js > loadTable: ordenando por ${sortTime}`)
    logs.sort((a, b) => {
        const dateA = parseDate(a.time);
        const dateB = parseDate(b.time);

        if (sortTime === "ascendente") {
            return dateA - dateB // Ascendente
        } else {
            return dateB - dateA // Descendente
        }
    })

    console.log(`= logs.js > loadTable: cargando tabla con <${riskFilter}>`)
    // Crear filas de la tabla
    for (let i = 0; i < logs.length; i++) {

        if (riskFilter === "All") {
            //console.log('todo cargado')
        } 
        else if (logs[i].risk == `${riskFilter}`) {
            //console.log('fitrado por riesgo')
        }
        else {
            //console.log('omitido')
            continue
        }

        let tr = document.createElement("tr")

        tr.addEventListener("click", (event) => {
            loadMenu(i) // No más boton de editar :D
            event.stopPropagation()
        })
        
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
        switch (logs[i].risk) {
            case 'High':
                td3.textContent = logs[i].risk
                td3.style.color = "red"
                break;

            case 'Warn':
                td3.textContent = logs[i].risk
                td3.style.color = "yellow"
                break;

            case 'Info':
                td3.textContent = logs[i].risk
                td3.style.color = "blue"
                break;
            
            default:
                td3.textContent = logs[i].risk
                td3.style.color = "pink"
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

    console.log(`= logs.js > changeText: comentario del evento ${logs[index].id} cambiado :)`)
    logs[index].comments = contenido

    // recargar tabla
    localStorage.setItem("logs", JSON.stringify(logs)) // guardar localstorage
    loadTable()
}



function loadMenu(index){ // Mostrar menú extra de cada evento
    console.log('LoadMenu called')

    // Crear filas de la tabla
    let logs = JSON.parse(localStorage.getItem("logs")) // cargar localstorage
    let dataTable = document.getElementById("context-data")

    // Limpiar contenido anterior
    while (dataTable.firstChild) {
        dataTable.removeChild(dataTable.firstChild)
    }

    let tbody = document.createElement("tbody")

    let tr = ""
    let td1 = ""
    let td2 = ""

        tr = document.createElement("tr") // Incidence number what

            td1 = document.createElement("td")
            td1.textContent = "Number"
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            td2.textContent = logs[index].id
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        tr = document.createElement("tr") // Device that exploded

            td1 = document.createElement("td")
            td1.textContent = "Device Involved"
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            td2.textContent = logs[index].device
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
            td2.innerHTML = `<textarea type="text" id="event-commentaries" placeholder="${logs[index].comments}" onblur="changeText(${index})">`
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        dataTable.appendChild(tbody)

        let deleteBtn = document.getElementById('deleteBtn')
            deleteBtn.setAttribute("onclick", `removeLog(${index})`)

        const contextMenu = document.getElementById('context-menu')
        contextMenu.addEventListener("click", (event) => {
            event.stopPropagation()
        })

        toggleMenu()
}


function toggleMenu(show = true) {
    // Enseñar menú (o no)
    let menu = document.getElementById("context-menu")
    let dataTable = document.getElementById("context-data")

    if (show === false) {
        menu.style.display = "none"
        while (dataTable.firstChild) {
            dataTable.removeChild(dataTable.firstChild)
        }
        return;
    }

    const actualState = menu.style.display
    switch (actualState){
        case "none":
            menu.style.display = "block"
            break;

        case "block":
            menu.style.display = "none"
            while (dataTable.firstChild) {
                dataTable.removeChild(dataTable.firstChild)
            }
            break;

        default:
            console.log('logs.js > toogleMenu > Error al cambiar, valor inesperado')
            console.log(actualState)
    }
}


function removeLog(index) {
    let logs = JSON.parse(localStorage.getItem("logs")) // cargar localstorage
    let account = JSON.parse(localStorage.getItem("account")) // cargar localstorage
    const logID = logs[index].id

    logs.splice(index, 1)
    localStorage.setItem("logs", JSON.stringify(logs)) // guardar localstorage

    log('Removed Log', 'OpenFi System', 'Warn', `Log ${logs[index].id} has been removed by ${account[0].username}`)
    console.log('removed log :>')
    
    loadTable()
    toggleMenu()
}


setTimeout(() => {
    log('Ready', 'Software', 'Info', 'Logging system is ready ;D')
    loadTable()
}, 2000)

// Cerrar menús secundarios al pulsar dondesea
document.body.addEventListener("click", function() {
    console.log("Hiciste click en alguna parte del body");
    toggleMenu(false)
})