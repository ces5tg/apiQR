const express=require( 'express' );
const bodyParser=require( 'body-parser' );
const router=express.Router();
router.use( bodyParser.json() );


const {getByNameAula , getByAulaIdHorario , getByHorario_HorarioPersona , asistencia} = require('../controllers/api.arduino.controller')


router.get( '/', async ( req, res ) => {
    res.send("hola , esta es la api de ARDUINO")
} );
router.get( '/aula/:name', getByNameAula)
router.get( '/horario/:aula_id?', getByAulaIdHorario )
router.get( '/horario_persona/:horario_id', getByHorario_HorarioPersona)
router.post( '/asistencia',  asistencia)

module.exports=router;