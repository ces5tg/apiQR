const express=require( 'express' );
const bodyParser=require( 'body-parser' );
const qr=require( 'qrcode' );
const moment=require( 'moment-timezone' );
const router=express.Router();
router.use( bodyParser.json() );

const {Aula , Persona , Horario , HorarioPersona} = require('../models/collections.schema')
// listar los horarios del profesor

router.get( '/inicioSesion', async ( req, res ) => {
    const {email , password}  = req.body

    try {
        const busquedaAula=await Persona.findOne( { descripcion: new RegExp( req.params.nameAula, 'i' ) } );
        res.json(busquedaAula);
    } catch ( error ) {
        res.status( 500 ).json( { error: 'error , codigo QR , aula no existe' } );
    }
} );
router.get( '/validarCodigo/:nameAula', async ( req, res ) => {
    try {
        const busquedaAula=await Aula.findOne( { descripcion: new RegExp( req.params.nameAula, 'i' ) } );
        res.json(busquedaAula);
    } catch ( error ) {
        res.status( 500 ).json( { error: 'error , codigo QR , aula no existe' } );
    }
} );

router.post( '/validarHorario', async ( req, res ) => {
    const horaActual=moment().tz( 'America/Lima' ).toDate();
    const { idAula, idPersona, password }=req.body
    try {
     
        const searchHorario=await Horario.findOne( {
            aula: idAula,//dia
            hora_inicio: { $lte: horaActual },  // Menor o igual a la hora actual
            hora_fin: { $gt: horaActual },  // Mayor que la hora actual
        } );
   
        const searchHorarioPersona=await HorarioPersona.findOne( {
            id_horario: { $exists: true, $eq: searchHorario._id },
            id_persona: { $exists: true, $eq: idPersona },
            contrasena: { $exists: true, $eq: password },
        } );
        if ( searchHorarioPersona ) {
            searchHorarioPersona.asistencia=true;
            await searchHorarioPersona.save();
        }

        res.json(searchHorarioPersona);
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { error: 'error , Horario Persona' } );
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
