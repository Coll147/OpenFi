const express = require("express");
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");

const webserver = express();
const PORT = process.env.PORT;

webserver.use(express.json());


// Ruta inicial
webserver.use(express.static("public"));

// Views
webserver.set("view engine", "ejs");

// Control de JSON
webserver.get("/api/devices", (req, res) => {
  const data = fs.readFileSync("./server/data.json", "utf-8");
  res.json(JSON.parse(data).usuarios);
});
webserver.post("/api/devices", (req, res) => {
  const nuevoUsuario = req.body;

  const data = JSON.parse(fs.readFileSync("./server/data.json", "utf-8"));
  data.usuarios.push(nuevoUsuario);

  fs.writeFileSync("./server/data.json", JSON.stringify(data, null, 2));
  res.json({ mensaje: "Usuario guardado" });
});

// Generar hash
webserver.post('/api/hash', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "no hay valor" });

  const hash = crypto.createHash('sha256').update(text).digest('hex');
  res.json({ hash });
});


webserver.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('ready');
});