const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./routes/auth');


const app = express();

// Configuración de multer
const multer = require('multer');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', auth);

// Conexión a la base de datos
mongoose
  .connect('mongodb://127.0.0.1:27017/QRApi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });


// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Manejo de errores 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
