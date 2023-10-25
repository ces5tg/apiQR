const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const PersonaSchema = new mongoose.Schema({
    name: String,
});

const Persona = mongoose.model('Persona', PersonaSchema);

const AulaSchema = new mongoose.Schema({
    name: String,
    descripcion: String,
    Zona: String,
    Codigo: String,
});

const Aula = mongoose.model('Aula', AulaSchema);

const HorarioSchema = new mongoose.Schema({
    dia: Date,
    hora_inicio: Date,
    hora_fin: Date,
    estado: String,
    aula: [{
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Aula',
        },
    }],
});

const Horario = mongoose.model('Horario', HorarioSchema);

const HorarioPersonaSchema = new mongoose.Schema({
    id_horario: [{
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Horario',
        },
    }],
    id_persona: [{
        id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Persona',
        },
    }],
    asistencia: Boolean,
    estado: Boolean,
});

const HorarioPersona = mongoose.model('HorarioPersona', HorarioPersonaSchema);

router.get('/', async (req, res) => {
    try {
        const horarioPersona = await HorarioPersona.find();
        const personas = await Persona.count();
        const aula = await Aula.count();
        console.log(aula)
        console.log(personas)
        console.log(horarioPersona);
        res.json(horarioPersona); // Enviar una respuesta JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información de HorarioPersona' });
    }
});

module.exports = router;
