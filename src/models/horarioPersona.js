const mongoose = require('mongoose');

const HorarioPersonaSchema = new mongoose.Schema({
    id_horario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horario',
    },
    id_grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo',
    },
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
    },
    id_persona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
    },
    asistencia: Boolean,
    estado: Boolean,
    contrasena: String,
});

module.exports = mongoose.model('HorarioPersona', HorarioPersonaSchema);
