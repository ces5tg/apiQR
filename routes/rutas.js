const express=require( 'express' );
const bodyParser=require( 'body-parser' );
const mongoose=require( 'mongoose' );
const router=express.Router();
const ObjectId=mongoose.Types.ObjectId
const path = require('path');

router.use( bodyParser.json() );
const PersonaSchema=new mongoose.Schema( {
    name: String,
} );

const Persona=mongoose.model( 'Persona', PersonaSchema );

const AulaSchema=new mongoose.Schema( {
    name: String,
    descripcion: String,
    Zona: String,
    Codigo: String,
} );

const Aula=mongoose.model( 'Aula', AulaSchema );

const HorarioSchema=new mongoose.Schema( {
    dia: Date,
    hora_inicio: Date,
    hora_fin: Date,
    estado: String,
    aula: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aula',

    },

} );

const Horario=mongoose.model( 'Horario', HorarioSchema );

const HorarioPersonaSchema=new mongoose.Schema( {
    id_horario: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horario',

    },
    id_persona: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',

    },
    asistencia: Boolean,
    estado: Boolean,
    contrasena: String
} );

const HorarioPersona=mongoose.model( 'HorarioPersona', HorarioPersonaSchema );

// Rutas CRUD para Persona
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

//termina crud de persona

router.get( '/', async ( req, res ) => {
    try {
        const horarioPersona=await HorarioPersona.find()

        /* const personas=await Persona.count();
        const aula=await Aula.count();
        console.log( aula )
        console.log( personas )
        console.log( horarioPersona[ 0 ].id_horario.id+"======" );
        const hor=horarioPersona[ 0 ].id_horario.id
        const horario=await Horario.find( { _id: hor } )
        console.log( horario+"00000000" ) */
        res.json( horarioPersona ); // Enviar una respuesta JSON
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de HorarioPersona' } );
    }
} );

//RUTAS CRUD PARA AULA 
router.post('/aula', async (req, res) => {
    try {
        const { name, descripcion, Zona, Codigo } = req.body;
        const nuevaAula = new Aula({ name, descripcion, Zona, Codigo });
        const aulaGuardada = await nuevaAula.save();
        res.json(aulaGuardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al guardar el aula' });
    }
});

router.get('/aula', async (req, res) => {
    try {
        const aulas = await Aula.find();
        res.render(path.join(__dirname, '..', 'views', 'aulas.ejs'), { aulas });
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
        const { name, descripcion, Zona, Codigo } = req.body;
        const aulaActualizada = await Aula.findByIdAndUpdate(
            req.params.id,
            { name, descripcion, Zona, Codigo },
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

router.get( '/aula/:name', async ( req, res ) => {
    try {
        const aula=await Aula.findOne( { name: req.params.name } )
        console.log( aula )
        res.json( aula )
    } catch {
        console.log( "error en el Aula" )
    }
} )
router.get( '/horario/:aula_id?', async ( req, res ) => {
    try {
        const horarios=await Horario.find( { aula: req.params.aula_id } )
        res.json( horarios )
    } catch ( error ) {
        console.log( "error horarios" )
    }

} )
router.get( '/horario_persona/:horario_id', async ( req, res ) => {
    try {
        const horarioPersona=await HorarioPersona.find( { id_horario: req.params.horario_id } )
        res.json( horarioPersona )
    } catch ( error ) {
        console.log( "error horarios" )
    }
} )
router.post( '/asistencia', async ( req, res ) => {
    try {
        const { asistencia, id_horario }=req.body
        /*    const asistencia = req.body.asistencia
           const id_horario = req.body.id_horario
      */

        console.log( asistencia+" -- "+id_horario )
        const horarioPersona=await HorarioPersona.updateOne( { _id: id_horario }, { asistencia: asistencia } );
        //const horarioPersona=await HorarioPersona.find( { _id: id_horario } )
        res.json( horarioPersona )
    } catch ( error ) {
        console.log( "error horarios" )
    }
} )
module.exports=router;
//6539c69532676c5408d6396f ->aula