const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));





app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
