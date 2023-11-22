const express = require('express');
const router = express.Router();
const path = require('path');

// Importar los modelos
const Persona = require('../models/persona');
const Aula = require('../models/aula');

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


module.exports = router;
