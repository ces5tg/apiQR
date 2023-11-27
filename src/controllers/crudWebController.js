const express = require('express');
const router = express.Router();
const path = require('path');

// Importar los modelos
const Persona = require('../models/persona');
const Aula = require('../models/aula');
const Carrera = require('../models/carrera');
const Curso = require('../models/curso');
const Grupo = require('../models/grupo');
const Horario = require('../models/horario');
const HorarioPersona = require('../models/horarioPersona');

// Rutas para CRUD de Persona
router.get('/personas', async (req, res) => {
    try {
        const personas = await Persona.find();
        res.render(path.join(__dirname, '..', '..', 'views', 'persona', 'crud.ejs'), { personas });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de personas' });
    }
});


// Rutas para CRUD de Aula
router.get('/aulas', async (req, res) => {
    try {
        const aulas = await Aula.find();
        res.render(path.join(__dirname, '..', '..', 'views', 'aula', 'crud.ejs'), { aulas });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de aulas' });
    }
});

// Rutas para CRUD de Carrera
router.get('/carreras', async (req, res) => {
    try {
        const carreras = await Carrera.find();
        res.render(path.join(__dirname, '..', '..', 'views', 'carrera', 'crud.ejs'), { carreras });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de carreras' });
    }
});

// Rutas para CRUD de Curso
router.get('/cursos', async (req, res) => {
    try {
        const cursos = await Curso.find().populate('id_carrera');
        const carreras = await Carrera.find();
        res.render(path.join(__dirname, '..', '..', 'views', 'curso', 'crud.ejs'), { cursos, carreras });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de cursos' });
    }
});

// Rutas para CRUD de Grupo
router.get('/grupos', async (req, res) => {
    try {
        const grupos = await Grupo.find().populate('id_carrera');
        const carreras = await Carrera.find();
        res.render(path.join(__dirname, '..', '..', 'views', 'grupo', 'crud.ejs'), { grupos, carreras });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de grupos' });
    }
});

// Rutas para CRUD de Horarios
router.get('/horarios', async (req, res) => {
    try {
        const horarios = await Horario.find().populate('aula');
        const aulas = await Aula.find();
        res.render(path.join(__dirname, '..', '..', 'views', 'horario', 'crud.ejs'), { horarios, aulas });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de aulas' });
    }
});

// Rutas para CRUD de Horarios-Persona
router.get('/horariosPersonas', async (req, res) => {
    try {
        const horariosPersonas = await HorarioPersona.find()
        .populate([
            { path: 'id_horario' },
            { path: 'id_grupo', select: ['name'] },
            { path: 'id_curso', select: ['name'] },
            { path: 'id_persona', select: ['name'] }
        ]);

        const horarios = await Horario.find();
        const cursos = await Curso.find();
        const grupos = await Grupo.find();
        const personas = await Persona.find();
        res.render(path.join(__dirname, '..', '..', 'views', 'horarioPersona', 'crud.ejs'), { horariosPersonas, horarios, grupos, cursos, personas });
    } catch (error) {
        console.error('Error al obtener horario persona:', error);
        res.status(500).json({ message: 'Error al obtener la lista de aulas' });
    }
});

module.exports = router;
