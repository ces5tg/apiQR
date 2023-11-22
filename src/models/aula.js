const mongoose = require('mongoose');

const AulaSchema = new mongoose.Schema({
    name: String,
    descripcion: String,
    zona: String,
    codigo: String,
});

module.exports = mongoose.model('Aula', AulaSchema);