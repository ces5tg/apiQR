const mongoose = require('mongoose');

const CarreraSchema = new mongoose.Schema({
    name: String,
    descripcion: String,
    nro_ciclos: String,
});

module.exports = mongoose.model('Carrera', CarreraSchema);