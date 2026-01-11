const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));


// Ruta para obtener datos
app.get("/api/devices", (req, res) => {
  const data = fs.readFileSync("./server/data.json", "utf-8");
  res.json(JSON.parse(data).usuarios);
});

// Ruta para guardar datos
app.post("/api/devices", (req, res) => {
  const nuevoUsuario = req.body;

  const data = JSON.parse(fs.readFileSync("./server/data.json", "utf-8"));
  data.usuarios.push(nuevoUsuario);

  fs.writeFileSync("./server/data.json", JSON.stringify(data, null, 2));
  res.json({ mensaje: "Usuario guardado" });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
