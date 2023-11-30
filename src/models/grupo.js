const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
    name: String,
    nro_inscritos: Number,
    id_carrera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
    },
});

module.exports = mongoose.model('Grupo', GrupoSchema);