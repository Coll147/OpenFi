// Cambio de nick
async function changeNick(index) {
  console.log(index)

  const devices = await loadDB('devices');
  const new_name = document.getElementById("device-nick").value

  console.log(`Nombre de ${devices[index].model} cambiado de ${devices[index].nick} a ${new_name}`)
  //log('Nick changed', `${devices[index].model}`, 'Warn', `Nombre de ${devices[index].model} cambiado de ${devices[index].nickname} a ${contenido}`)

  const response = await writeDB('devices', 'nick', new_name, 'mac', devices[index].mac)
  console.log(response)
  // recargar tabla
  loadTable()
}


// Cargar tabla
async function loadTable(){ 

  const devices = await loadDB('devices');
  console.log(devices)
  const tabla = document.getElementById("devices-tbody")

  // Limpiar si hay cosas
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild)
  }

  // Crear filas de la tabla
  for (let i = 0; i < devices.length; i++) {

  const device = devices[i];
  const specs = JSON.parse(device.specs);
  const systemKey = Object.keys(specs)[0];
  const systemInfo = specs[systemKey];

  let tr = document.createElement("tr")

    let td1 = document.createElement("td") // Nick
    td1.textContent = devices[i].nick
    tr.appendChild(td1)
    
    let td2 = document.createElement("td") // IP
    td2.textContent = devices[i].ip
    tr.appendChild(td2)

    let td3 = document.createElement("td") // Status
    if (ping(devices[i].ip)){
      td3.textContent = 'Online'
    }
    else {
      td3.textContent = 'Error'
    }
    tr.appendChild(td3)

    let td4 = document.createElement("td") // Uptime
    td4.textContent = devices[i].uptime
    tr.appendChild(td4)

    let td5 = document.createElement("td") // Model
    td5.textContent = devices[i].model
    tr.appendChild(td5)

    let td6 = document.createElement("td") // Version
    td6.textContent = systemInfo.Release
    tr.appendChild(td6)

    let td7 = document.createElement("td") // Actions
    td7.classList.add("actions")

      // Botón de editar
      let btnEdit = document.createElement("button")
      btnEdit.classList.add("btn")
      btnEdit.classList.add("edit")
      btnEdit.textContent = "✏️"
      btnEdit.setAttribute("onclick", `mountMenu(${i})`)
      btnEdit.id = "edit-" + devices[i].id

      // Botón de reiniciar
      let btnRestart = document.createElement("button")
      btnRestart.classList.add("btn")
      btnRestart.classList.add("restart")
      btnRestart.textContent = "🔁"
      btnEdit.id = "restart-" + devices[i].id

      td7.appendChild(btnEdit)
      td7.appendChild(btnRestart)

    tr.appendChild(td7)

    tabla.addEventListener("click", (event) => {
      event.stopPropagation()
    })

    tabla.appendChild(tr)
    }
}



// Enseñar menú
function toggleMenu(value) {
  const element = document.getElementById("context-menu")
  let actualState
  if (value === false) {
    actualState = 'block'
  }
  else {
    actualState = element.style.display
  }

  let statusTable = document.getElementById("device-status")
  let wifiTable = document.getElementById("wifi-status")

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



async function mountMenu(id) {
  const devices = await loadDB('devices');
  console.log(`enseñando menú para ${id}`);

  const device = devices[id];
  const specs = JSON.parse(device.specs);
  const systemKey = Object.keys(specs)[0];
  const systemInfo = specs[systemKey];

  const title = document.getElementById('device_aside_title');
  title.textContent = devices[id].nick;

  // Tablas
  const statusTable = document.getElementById("device-status");
  const wifiTable = document.getElementById("wifi-status");

  // Limpiar tablas antes de rellenarlas
  while (statusTable.firstChild) statusTable.removeChild(statusTable.firstChild);
  while (wifiTable.firstChild) wifiTable.removeChild(wifiTable.firstChild);

  // Crear filas de <status>
  const tbody = document.createElement("tbody");

  // Nick
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  td1.textContent = "Device Name";
  tr.appendChild(td1);

  let td2 = document.createElement("td");
  td2.innerHTML = `<input type="text" id="device-nick" placeholder="${devices[id].nick}" onblur="changeNick(${id})">`;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  // Model
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td1.textContent = "Model";
  tr.appendChild(td1);

  td2 = document.createElement("td");
  td2.textContent = devices[id].model;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  // Vendor
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td1.textContent = "Vendor";
  tr.appendChild(td1);

  td2 = document.createElement("td");
  const res = await fetch(`/api/mac/${devices[id].mac}`);
  const data = await res.json();
  td2.textContent = data.company;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  // IP
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td1.textContent = "IP Addr.";
  tr.appendChild(td1);

  td2 = document.createElement("td");
  td2.textContent = devices[id].ip;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  // MAC
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td1.textContent = "MAC Addr.";
  tr.appendChild(td1);

  td2 = document.createElement("td");
  td2.textContent = devices[id].mac;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  // Firmware version
  tr = document.createElement("tr");
  td1 = document.createElement("td");
  td1.textContent = "Firmware version";
  tr.appendChild(td1);

  td2 = document.createElement("td");
  td2.textContent = systemInfo.Description;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  // Detener propagación al hacer click dentro de la tabla
  statusTable.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  statusTable.appendChild(tbody);

  const removeBtn = document.getElementById('remove_device_btn');
  removeBtn.onclick = (e) => {
    removeDevice(devices[id].mac);
  }

  openMenu();
}



async function AddDevice(e) {
  e.preventDefault(); // prevent page reload
  console.log('añadiendooooo')
  const ip = document.getElementById('device-ip').value
  const nick = document.getElementById('device-nick').value
  console.log(ip, nick)

  const isOnline = await ping(ip);
  console.log(isOnline);
  if (!isOnline) {
    console.error('Device not online'); 
    return;
  }

  log('Added Device', 'OpenFi System', 'Info', `Se ha añadido el dispositivo ${ip}`);
  
  try {
    const payload = {
      deviceIp: ip,
      deviceNick: nick
    };

    const response = await fetch('/api/storage/device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log(result)

  } catch (err) {
    console.error('Error de conexión:', err);
  }
  
  loadTable()
  closeModal()
}



async function removeDevice(deviceMac) {
  const result = await removeDB('devices', 'mac', deviceMac);
  console.log('Resultado de la eliminación:', result);
}



// Handle buttons and menus
const contextMenu = document.getElementById('context-menu');
const addBtn = document.getElementById('add-device-btn');
const modalWrapper = document.getElementById('add-device-modal');
const modalBox = modalWrapper.querySelector('.modal');

// open aside menu
function openMenu() {
  contextMenu.style.display = 'block';
}

// close aside menu
function closeMenu() {
  contextMenu.style.display = 'none';
}

// open add device
function openModal() {
  modalWrapper.style.zIndex = 1;
}

// close add device
function closeModal() {
  modalWrapper.style.zIndex = -1;
}

// add device button
addBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  openModal()
});

// stop propagation aside menu
contextMenu.addEventListener('click', (e) => {
  e.stopPropagation()
});

// stop propagation modal menu
modalWrapper.addEventListener('click', (e) => {
  
});
modalBox.addEventListener('click', e => e.stopPropagation());

// close all on click body
document.addEventListener('click', () => {
  closeMenu()
  closeModal()
});

// form submission handler
const addDeviceForm = document.getElementById('add-device-form');
if (addDeviceForm) {
  addDeviceForm.addEventListener('submit', AddDevice);
}
