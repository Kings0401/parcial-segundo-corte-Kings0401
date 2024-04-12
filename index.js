const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4040;

app.use(express.json());

//Url directa sin rutas
app.get('/', (req, res) => {
  res.send('Wenassss, soy Gabriela Reyes');
});


// Ruta para obtener el precio de una moneda
app.get('/coin/:coinName', async (req, res) => {
  const { coinName } = req.params;
  try {
    const solicitud = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);
    const precio = solicitud.data.data.priceUsd;
    res.send(`El precio en dólares de la moneda para el día de hoy es ${precio}`);
  } catch (error) {
    res.send('El nombre de la moneda no fue encontrado en la base de datos');
  }
});


// Lista de compañeros
const compañeros = [
  "ACERO SAMUEL",
  "ALJURI DAREK",
  "AZCONA ANDRÉS",
  "CEPEDA FELIPE",
  "CHAVES ANA",
  "CRUZ CARLOS",
  "DIAZ DIEGO",
  "DIAZ JORGE",
  "DIAZ DAVID",
  "FORERO JUAN JOSE",
  "GUTIERREZ SANTIAGO",
  "LOPEZ SAMUEL",
  "MEDINA MICHAEL",
  "MORENO KATHERIN",
  "MORENO JUAN PABLO",
  "MUÑOZ NICOLAS",
  "NAVARRO SANTIAGO",
  "PARRADO JUAN PABLO",
  "RAMIREZ DANIEL",
  "RESTREPO JUAN PABLO",
  "REYES GABRIELA",
  "RODRIGUEZ JUAN JOSE",
  "RUIZ VALENTINA",
  "SALAS MARIANA",
  "SANCHEZ SEBASTIAN",
  "SARMIENTO JOSUE",
  "SOLER SANTIAGO",
  "TAMAYO FERNANDA",
  "URREA NICOLAS",
];

// Ruta para obtener la lista de compañeros
app.get('/users/:count', (req, res) => {
  let { count } = req.params;
  const { sort } = req.query;

  // Validar el parámetro count devolver si ingresa un valor inadecuado ya que la cantidad de estudiantes va de 0 hatsa 29
  count = parseInt(count);
  if (isNaN(count) || count <= 0 || count > compañeros.length) {
      return res.status(400).send('El parámetro count debe ser un número mayor que 0 y menor o igual a 29');
  }

  // Ordenar la lista de compañeros segun se diga
  let listaCompañeros = compañeros.slice(0, count);
  if (sort && sort.toUpperCase() === 'DESC') {
      listaCompañeros = listaCompañeros.reverse();
  }

  // Enviar la lista de usuarios
  res.send(listaCompañeros.join('\n'));
});


// Ruta para crear, enviar y mostrar los datos en tipo JSON
let users = [];
app.post('/users', (req, res) => {
  const { name, lastName, email, city = 'Bogotá', country = 'Colombia' } = req.body;
  const nuevoUsuario = { name, lastName, email, city, country };
  users.push(nuevoUsuario);
  res.json(nuevoUsuario);
});


// Ruta para indicar el puerto a utilizar
app.listen(PORT, () => {
    console.log(`Esta vivito en http://localhost:${PORT}`);
});
