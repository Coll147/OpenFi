// ---- EVENTOS ----

// Ordenar por tiempo
document.getElementById('time').addEventListener('click', () => {
  const arrowElement = document.getElementById('time_arrow');
  let sortTime;

  if (arrowElement.textContent === "▲") {
    arrowElement.textContent = "▼";
    sortTime = "descendente";
  } else {
    arrowElement.textContent = "▲";
    sortTime = "ascendente";
  }

  console.log(`= logs.js > filterLogs: filtrar por ${sortTime}`);
  loadTable(null, sortTime);
});


// ---- FUNCIONES PRINCIPALES ----

// Cargar y crear tabla
async function loadTable(riskFilter, sortTime) {
  const logs = await loadDB('logs');
  const tabla = document.getElementById("devices-tbody");

  // Defaults correctos
  if (!riskFilter) riskFilter = 'All';
  if (!sortTime) sortTime = 'ascendente';

  // Limpiar tabla
  tabla.innerHTML = "";

  console.log(`= logs.js > loadTable: ordenando por ${sortTime}`);

  // Ordenar logs por fecha
  logs.sort((a, b) => {
    const dateA = parseDate(a.time);
    const dateB = parseDate(b.time);
    return sortTime === "ascendente" ? dateA - dateB : dateB - dateA;
  });

  console.log(`= logs.js > loadTable: cargando tabla con <${riskFilter}>`);

  logs.forEach((log, i) => {
    if (riskFilter !== "All" && log.risk !== riskFilter) return;

    const tr = document.createElement("tr");
    tr.addEventListener("click", (event) => {
      loadMenu(i);
      event.stopPropagation();
    });

    // Celdas
    ['type','device','time','risk','info'].forEach((key, idx) => {
      const td = document.createElement("td");
      td.textContent = log[key];
      if (key === 'risk') {
        switch (log.risk) {
          case 'High': td.style.color = "red"; break;
          case 'Warn': td.style.color = "yellow"; break;
          case 'Info': td.style.color = "blue"; break;
          default: td.style.color = "pink";
        }
      }
      tr.appendChild(td);
    });

    tabla.appendChild(tr);
  });
}


// Cambiar comentario de un evento
function changeText(index) {
  const contenido = document.getElementById("event-commentaries").value;

  console.log(`= logs.js > changeText: comentario del evento ${logs[index].id} cambiado :)`);
  logs[index].comments = contenido;

  localStorage.setItem("logs", JSON.stringify(logs));
  loadTable();
}


// Mostrar menú de detalles de un evento
async function loadMenu(index) {
  console.log('LoadMenu called');

  const logs = await loadDB('logs');
  const dataTable = document.getElementById("context-data");

  while (dataTable.firstChild) dataTable.removeChild(dataTable.firstChild);

  const tbody = document.createElement("tbody");

  // Número
  let tr = document.createElement("tr");
    let td1 = document.createElement("td");
      td1.textContent = "Number";
    tr.appendChild(td1);

    let td2 = document.createElement("td");
      td2.textContent = logs[index].id;
    tr.appendChild(td2);
  tbody.appendChild(tr);

  // Dispositivo
  tr = document.createElement("tr");
    td1 = document.createElement("td");
    td1.textContent = "Device Involved";
  tr.appendChild(td1);
  td2 = document.createElement("td");
  td2.textContent = logs[index].device;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  // Comentarios
  tr = document.createElement("tr");
    td1 = document.createElement("td");
    td1.textContent = "Comments";
    td1.colSpan = 2;
  tr.appendChild(td1);
  tbody.appendChild(tr);

  // Comentarios textarea
  tr = document.createElement("tr");
  td2 = document.createElement("td");
  td2.colSpan = 2;
  td2.innerHTML = `<textarea type="text" id="event-commentaries" placeholder="${logs[index].comments}" onblur="changeText(${index})"></textarea>`;
  tr.appendChild(td2);
  tbody.appendChild(tr);

  dataTable.appendChild(tbody);

  // Botón eliminar
  const deleteBtn = document.getElementById('deleteBtn');
  deleteBtn.setAttribute("onclick", `removeLog(${index})`);

  const contextMenu = document.getElementById('context-menu');
  contextMenu.addEventListener("click", (event) => event.stopPropagation());

  toggleMenu();
}

// Mostrar u ocultar menú contextual
function toggleMenu(show = true) {
  const menu = document.getElementById("context-menu");
  const dataTable = document.getElementById("context-data");

  if (!show) {
    menu.style.display = "none";
    while (dataTable.firstChild) dataTable.removeChild(dataTable.firstChild);
    return;
  }

  switch (menu.style.display) {
    case "none":
      menu.style.display = "block";
      break;
    case "block":
      menu.style.display = "none";
      while (dataTable.firstChild) dataTable.removeChild(dataTable.firstChild);
      break;
    default:
      console.log('logs.js > toggleMenu > valor inesperado', menu.style.display);
  }
}

// Eliminar log
function removeLog(index) {
  let logs = JSON.parse(localStorage.getItem("logs"));
  logs.splice(index, 1);
  localStorage.setItem("logs", JSON.stringify(logs));

  console.log('removed log :>');
  loadTable();
  toggleMenu();
}

// Cerrar menús al hacer click fuera
document.body.addEventListener("click", () => {
  console.log("Hiciste click en el body");
  toggleMenu(false);
});