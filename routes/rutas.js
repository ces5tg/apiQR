const express=require( 'express' );
const bodyParser = require('body-parser');
const mongoose=require( 'mongoose' );
const router=express.Router();
const ObjectId=mongoose.Types.ObjectId

router.use(bodyParser.json());
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
        console.log("error horarios")
    }

} )
router.get('/horario_persona/:horario_id' , async(req , res) =>{
    try {
        const horarioPersona=await HorarioPersona.find( { id_horario: req.params.horario_id } )
        res.json( horarioPersona )
    } catch ( error ) {
        console.log("error horarios")
    }
})
router.post('/asistencia' , async(req , res) =>{
    try {
        /* const {asistencia , id_horario} = req.body */
        const asistencia = req.body.asistencia
        const id_horario = req.body.id_horario
  
        console.log(asistencia + " -- "+ id_horario)
        const horarioPersona = await HorarioPersona.updateOne({ _id: id_horario }, {asistencia : asistencia});
        //const horarioPersona=await HorarioPersona.find( { _id: id_horario } )
        res.json( horarioPersona )
    } catch ( error ) {
        console.log("error horarios")
    }
})
module.exports=router;
 //6539c69532676c5408d6396f ->aula