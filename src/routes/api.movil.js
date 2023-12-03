const express=require( 'express' );
const bodyParser=require( 'body-parser' );
const qr=require( 'qrcode' );
const moment=require( 'moment-timezone' );
const router=express.Router();
router.use( bodyParser.json() );

const Aula  = require('../models/aula')
const Horario  = require('../models/horario')
const HorarioPersona  = require('../models/horarioPersona')
const io = require('../../sockets')
// listar los horarios del profesor

router.get( '/inicioSesion', async ( req, res ) => {
    const {email , password}  = req.body

    try {
        const busquedaAula=await Persona.findOne( { name: new RegExp( req.params.nameAula, 'i' ) } );
        res.json(busquedaAula);
    } catch ( error ) {
        res.status( 500 ).json( { error: 'error , codigo QR , aula no existe' } );
    }
} );
router.get( '/validarCodigo/:nameAula', async ( req, res ) => {
    try {
        const busquedaAula=await Aula.findOne( { name: new RegExp( req.params.nameAula, 'i' ) } );
        res.json(busquedaAula);
    } catch ( error ) {
        res.status( 500 ).json( { error: 'error , codigo QR , aula no existe' } );
    }
} );


router.post( '/validarHorario', async ( req, res ) => {
    const horaActual = moment().tz('America/Lima');
    console.log("la hora actual es ---> "+ horaActual.format('HH:mm'))
    const horaActual2 = moment()
    console.log("la hora actual es ---> "+ horaActual2.format('HH:mm'))
    const { idAula, idPersona, password }=req.body
    console.log(idAula + " --  " + idPersona + " --  " +password)
    try {
        console.log(horaActual )

        const horaDescontada = horaActual.subtract(5, 'hours');
        const searchHorario=await Horario.findOne( {
            aula: idAula,//dia
            hora_inicio: { $lte: horaDescontada },  // Menor o igual a la hora actual
            hora_fin: { $gt: horaDescontada },  // Mayor que la hora actual
        } );
        console.log({searchHorario} )
        const searchHorarioPersona=await HorarioPersona.findOne( {
            id_horario: { $exists: true, $eq: searchHorario._id },
            id_persona: { $exists: true, $eq: idPersona },

        } );
        if ( searchHorarioPersona ) {
            searchHorarioPersona.asistencia=true;
            await searchHorarioPersona.save();

            console.log('Enviando evento asistenciaCambiada:', {
                idHorarioPersona: searchHorarioPersona._id,
                nuevaAsistencia: searchHorarioPersona.asistencia,
            });

            // Emitir un evento a través de Socket.IO después de cambiar la asistencia a true
           /*  io.emit('asistenciaCambiada', {
                idHorarioPersona: searchHorarioPersona._id,
                nuevaAsistencia: searchHorarioPersona.asistencia,
            }); */
        }


        res.json(searchHorarioPersona);
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'error , Horario Persona' } );
        io.emit('asistenciaCambiada',"hoa , error");
    }
} )



module.exports=router;

/* router.get( '/createAula', async ( req, res ) => {

    res.render( 'aulas' )

} ); */
/* router.post( '/form', async ( req, res ) => {
    const { nombre }=req.body
    const urlAula=`http://localhost:3000/api/movil/validar/${ nombre }`;
    // Generar el código QR como una imagen en formato base64
    const imagenBase64=await qr.toDataURL( urlAula );

    // Guardar en la base de datos
    const nuevaAula=new Aula( {
        name: nombre,
        descripcion: nombre,
        zona: "pabellon A",
        codigo: imagenBase64,
    } );
    await nuevaAula.save();

    // Devolver la imagen del código QR en la respuesta
    res.send( `<img src="${ imagenBase64 }" alt="Codigo QR"> ` );

} ); */
