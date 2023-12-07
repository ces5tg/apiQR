const mongoose = require('mongoose');

const HorarioSchema = new mongoose.Schema({
    dia: Date,
    hora_inicio: Date,
    hora_fin: Date,
<<<<<<< HEAD
    estado: Boolean,
=======
    estado: {
        type: Boolean,
        default : false,
    },
>>>>>>> a3158138f5b37a05adf336a8de48fcfb11dba468
    aula: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aula',
    },
});

module.exports = mongoose.model('Horario', HorarioSchema);
