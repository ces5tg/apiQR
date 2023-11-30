const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
    name: String,
    horas_lab: Number,
    horas_teo: Number,
    horas_total: Number,
    id_carrera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
    },
});

module.exports = mongoose.model('Curso', CursoSchema);
