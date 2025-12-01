function loadTable(){ // Creación de la tabla - de dispositivos
    
    const tabla = document.getElementById("devices-tbody")

    // Limpiar si hay cosas
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild)
    }

    // Crear filas de la tabla
    for (let i = 0; i < devices.length; i++) {

        let tr = document.createElement("tr")
        
        let td1 = document.createElement("td") // Nick
        td1.textContent = devices[i].nickname
        tr.appendChild(td1)
        
        let td2 = document.createElement("td") // IP
        td2.textContent = devices[i].ip
        tr.appendChild(td2)

        let td3 = document.createElement("td") // Status
        td3.textContent = devices[i].status
        tr.appendChild(td3)

        let td4 = document.createElement("td") // Uptime
        td4.textContent = devices[i].uptime
        tr.appendChild(td4)

        let td5 = document.createElement("td") // Model
        td5.textContent = devices[i].model
        tr.appendChild(td5)

        let td6 = document.createElement("td") // Firmware
        td6.textContent = devices[i].firmware
        tr.appendChild(td6)

        let td7 = document.createElement("td") // Actions
        td7.classList.add("actions")

            // Botón de editar
            let btnEdit = document.createElement("button")
            btnEdit.classList.add("edit")
            btnEdit.textContent = "✏️"
            btnEdit.setAttribute("onclick", `toggleMenu(${i})`)
            btnEdit.id = "edit-" + devices[i].id

            // Botón de reiniciar
            let btnRestart = document.createElement("button")
            btnRestart.classList.add("restart")
            btnRestart.textContent = "🔁"
            btnEdit.id = "restart-" + devices[i].id

            td7.appendChild(btnEdit)
            td7.appendChild(btnRestart)

        tr.appendChild(td7)
        
        tabla.appendChild(tr)
    }
}




    
function toggleMenu(device){ // Mostrar menú extra de cada dispositivo

    // Crear filas de la tabla de <radios>
    let wifiTable = document.getElementById("wifi-status")

    console.log(devices[device].radios.length)

    for (let i = 0; i < devices[device].radios.length; i++) {

        const tbody = document.createElement("tbody")
        const tr = document.createElement("tr")
        
            let td1 = document.createElement("td") // radio name
            td1.textContent = devices[device].radios[i].name
            tr.appendChild(td1)
            
            let td2 = document.createElement("td") // channel
            td2.append(
                document.createTextNode(devices[device].radios[i].channel),
                document.createTextNode(" "),
                document.createTextNode(devices[device].radios[i].bandwidth),
                document.createElement("br"),
                devices[device].radios[i].frequency
            );
            tr.appendChild(td2)

            let td3 = document.createElement("td") // wifi_standard
            td3.textContent = devices[device].radios[i].wifi_standard
            tr.appendChild(td3)

            let td4 = document.createElement("td") // speed
            td4.textContent = devices[device].radios[i].speed
            tr.appendChild(td4)

            let td5 = document.createElement("td") // clients
            td5.textContent = devices[device].radios[i].clients
            tr.appendChild(td5)
            
        tbody.appendChild(tr)

        wifiTable.appendChild(tbody)
    }


    // Crear filas de la tabla de <status>
    let statusTable = document.getElementById("device-status")

    let tbody = document.createElement("tbody")

    let tr = ""
    let td1 = ""
    let td2 = ""

        tr = document.createElement("tr") // Nick

            td1 = document.createElement("td")
            td1.textContent = "Device Name"
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            //td2.textContent = devices[device].nickname
            td2.innerHTML = `<input type="text" id="device-nick" placeholder="${devices[device].nickname}" onblur="changeNick(${device})">`
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        tr = document.createElement("tr") // Model

            td1 = document.createElement("td")
            td1.textContent = "Model"
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            td2.textContent = devices[device].model
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        tr = document.createElement("tr") // IP

            td1 = document.createElement("td")
            td1.textContent = "IP Addr."
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            td2.textContent = devices[device].ip
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        tr = document.createElement("tr") // Version

            td1 = document.createElement("td")
            td1.textContent = "Firmware version"
            tr.appendChild(td1)
        
            td2 = document.createElement("td")
            td2.textContent = devices[device].version
            tr.appendChild(td2)
        

        tbody.appendChild(tr)

        statusTable.appendChild(tbody)


    // Enseñar menú
    const element = document.getElementById("context-menu")
    const actualState = element.style.display
    switch (actualState){
        case "none":
            element.style.display = "block"
            break;

        case "block":
            element.style.display = "none"
            while (statusTable.firstChild) {
                statusTable.removeChild(statusTable.firstChild)
            }
            while (wifiTable.firstChild) {
                wifiTable.removeChild(wifiTable.firstChild)
            }
            break;

        default:
            console.log('actions.js > toogleMenu > Error al cambiar, valor inesperado')
            console.log(actualState)
    }
}