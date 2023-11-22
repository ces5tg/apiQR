const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
    dia: Date,
    hora_inicio: Date,
    hora_fin: Date,
    estado: String,
    aula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aula',
    },
});

module.exports = mongoose.model('Horario', HorarioSchema);
