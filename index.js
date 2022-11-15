const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConection } = require('./db/config');
require('dotenv').config();

const app = express();

// Conection base de datos
dbConection();

app.use(morgan('dev'));

//acceso statico
app.use( express.static('public') );

//CORS
app.use( cors() );
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth.routes'));


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});