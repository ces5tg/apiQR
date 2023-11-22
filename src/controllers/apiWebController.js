const express = require('express');
const router = express.Router();

// Importar los modelos
const Persona = require('../models/persona');
const Aula = require('../models/aula');

router.use(express.json());

// CRUD para Persona
router.get('/persona', async (req, res) => {
    try {
        const personas = await Persona.find();
        res.json(personas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de personas' });
    }
});

router.post('/persona', async (req, res) => {
    try {
        const { name } = req.body;
        const nuevaPersona = new Persona({ name });
        const personaGuardada = await nuevaPersona.save();
        res.json(personaGuardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar la persona' });
    }
});

router.get('/persona/:id', async (req, res) => {
    try {
        const persona = await Persona.findById(req.params.id);
        res.json(persona);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información de la persona' });
    }
});

router.put('/persona/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const personaActualizada = await Persona.findByIdAndUpdate(
            req.params.id,
            { name },
            { new: true }
        );
        res.json(personaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la persona' });
    }
});

router.delete('/persona/:id', async (req, res) => {
    try {
        await Persona.findByIdAndDelete(req.params.id);
        res.json({ message: 'Persona eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la persona' });
    }
});

// CRUD para Aula
router.post('/aula', async (req, res) => {
    try {
        const { name, descripcion, zona, codigo } = req.body;
        const nuevaAula = new Aula({ name, descripcion, zona, codigo });
        const aulaGuardada = await nuevaAula.save();
        res.json(aulaGuardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el aula' });
    }
});

router.get('/aula', async (req, res) => {
    try {
        const aulas = await Aula.find();
        res.json(aulas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información de las aulas' });
    }
});

router.get('/aula/:id', async (req, res) => {
    try {
        const aula = await Aula.findById(req.params.id);
        res.json(aula);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la información del aula' });
    }
});

router.put('/aula/:id', async (req, res) => {
    try {
        const { name, descripcion, zona, codigo } = req.body;
        const aulaActualizada = await Aula.findByIdAndUpdate(
            req.params.id,
            { name, descripcion, zona, codigo },
            { new: true }
        );
        res.json(aulaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el aula' });
    }
});

router.delete('/aula/:id', async (req, res) => {
    try {
        await Aula.findByIdAndDelete(req.params.id);
        res.json({ message: 'Aula eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el aula' });
    }
});

module.exports = router;
