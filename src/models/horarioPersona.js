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
<<<<<<< HEAD
    asistencia:  {
        type: String,
        enum: [ 'A', 'T', 'F' ]
    },
    estado: Boolean,

=======
    asistencia: {
        type: String,
        enum: ['A', 'T', 'F'],
        default: 'A',
    },    
    estado: {
        type: Boolean,
        default : false,
    },
>>>>>>> a3158138f5b37a05adf336a8de48fcfb11dba468
});

module.exports = mongoose.model('HorarioPersona', HorarioPersonaSchema);
