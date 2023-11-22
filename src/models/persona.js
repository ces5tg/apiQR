const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Persona', PersonaSchema);