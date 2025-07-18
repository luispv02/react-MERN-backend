const path = require('path')
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')


// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

// Rutas
// Todo lo que exporte el archivo: ./routes/auth, lo va a habilitar en la ruta:'/api/auth'
app.use( '/api/auth', require('./routes/auth') );
app.use( '/api/events', require('./routes/events') );

app.use('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${4000}`)
});