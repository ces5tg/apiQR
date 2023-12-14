const mongoose = require('mongoose');

const PersonaSchema = new mongoose.Schema({
    name: String,
    firstName: String,
    lastName: String,
    dni: String,
    estado: String,

    rol: {
        type: String,
        enum: [ 'admin', 'profesor', ' otro' ]
    },
    user: {
        username: String,
        email: String,
        password: String,
        profileImage: String,
        tokens: [{ type: String }], 
    }
});

module.exports = mongoose.model('Persona', PersonaSchema);