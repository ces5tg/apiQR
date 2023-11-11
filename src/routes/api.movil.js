const express=require( 'express' );
const bodyParser=require( 'body-parser' );
const qr=require( 'qrcode' );
const moment=require( 'moment-timezone' );
const router=express.Router();
router.use( bodyParser.json() );

const {Aula , Persona , Horario , HorarioPersona} = require('../models/collections.schema')


router.post( '/validarApp', async ( req, res ) => {
    const { aula_qr, id_persona }=req.body

    try {
        console.log( aula_qr )
        const busquedaAula=await Aula.findOne( { descripcion: new RegExp( aula_qr, 'i' ) } );
        if ( busquedaAula ) {

            res.json( busquedaAula )
        } else {
            res.status( 500 ).json( { error: 'Error al buscar aulas por descripción' } );
        }
    } catch ( error ) {
        console.log( "error horarios" )
    }
} )

router.get( '/createAula', async ( req, res ) => {

    res.render( 'aulas' )

} );
router.post( '/form', async ( req, res ) => {
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

} );
router.get( '/validar/:nameAula', async ( req, res ) => {
    try {
        // Recuperar todas las aulas desde la base de datos
        const busquedaAula=await Aula.findOne( { descripcion: new RegExp( req.params.nameAula, 'i' ) } );

        // Renderizar la vista con las aulas
        res.render( 'inicioSesion', { aula: busquedaAula } );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'error , codigo   QR ; aula' } );
    }


} );
router.post( '/formSesion', async ( req, res ) => {
    const horaActual=moment().tz( 'America/Lima' ).toDate();
    const { idAula, nombreUsuario, password }=req.body
    try {
        console.log( horaActual )
        const searchHorario=await Horario.findOne( {
            aula: idAula,
            hora_inicio: { $lte: horaActual },  // Menor o igual a la hora actual
            hora_fin: { $gt: horaActual },  // Mayor que la hora actual
        } );
        console.log( searchHorario+" este es el id del horario" )
        // Recuperar todas las aulas desde la base de datos
        const searchPersona=await Persona.findOne( { name: new RegExp( nombreUsuario, 'i' ) } );
        console.log( searchPersona._id+" este esl id de PERSONA" )


        const searchHorarioPersona=await HorarioPersona.findOne( {
            id_horario: { $exists: true, $eq: searchHorario._id },
            id_persona: { $exists: true, $eq: searchPersona._id },
            contrasena: { $exists: true, $eq: password },
        } );
        if ( searchHorarioPersona ) {
            searchHorarioPersona.asistencia=true;
            await searchHorarioPersona.save();
        }

        // Renderizar la vista con las aulas
        res.json( { horarios: searchHorarioPersona } );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'error , codigo   QR ; aula' } );
    }
} )
router.get( '/listarAulas', async ( req, res ) => {
    try {
        // Recuperar todas las aulas desde la base de datos
        const aulas=await Aula.find();

        // Renderizar la vista con las aulas
        res.render( 'listaraulas', { aulas } );
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'Error al listar las aulas' } );
    }
} );

module.exports=router;