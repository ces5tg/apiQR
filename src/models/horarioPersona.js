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

    asistencia: {
        type: String,
        enum: ['A', 'T', 'F'],
        default: 'A',
    },    
    estado: {
        type: Boolean,
        default : false,
    },

});

module.exports = mongoose.model('HorarioPersona', HorarioPersonaSchema);
