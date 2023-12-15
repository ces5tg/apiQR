const express=require( 'express' );
const bodyParser=require( 'body-parser' );

const moment=require( 'moment' );
const bcrypt=require( 'bcrypt' );
const jwt=require( 'jsonwebtoken' );

const Aula=require( '../models/aula' )
const Horario=require( '../models/horario' )
const HorarioPersona=require( '../models/horarioPersona' )
const Persona=require( '../models/persona' )

function RouterApiMovil( io ) {
  const router=express.Router();

  router.use( bodyParser.json() );



  router.post( '/inicioSesion', async ( req, res ) => {
    console.log("inicio sesion")
    const { email, password }=req.body;

    try {
      // Buscar al usuario por su dirección de correo electrónico
      const persona=await Persona.findOne( { 'user.email': email } );

      if ( !persona||!bcrypt.compareSync( password, persona.user.password ) ) {
        // Si el usuario no existe o la contraseña no coincide, devolver un error de autenticación
        return res.status( 401 ).json( { error: 'Credenciales incorrectas' } );
      }

      // Generar un token JWT
      const token=jwt.sign( { userId: persona._id }, 'secreto', { expiresIn: '1h' } );

      // Devolver el token como respuesta
      console.log( { persona } )
      res.json( persona );
    } catch ( error ) {
      console.error( 'Error en el inicio de sesión:', error );
      res.status( 500 ).json( { error: 'Error en el inicio de sesión' } );
    }
  } );


  router.post( '/registrarse', async ( req, res ) => {
    const { email, password }=req.body;

    try {

      const existingUser=await Persona.findOne( { 'user.email': email } );
      if ( existingUser ) {
        return res.status( 400 ).json( { error: 'el usuario ya existe' } );
      }

      const hashedPassword=bcrypt.hashSync( password, 10 );
      const newPersona=new Persona( {
        user: {
          email: email,
          password: hashedPassword,
        },

      } );

      const savedPersona=await newPersona.save();
      res.json( savedPersona );
    } catch ( error ) {

      res.status( 500 ).json( { error: 'erro al insertar nuevo usuario' } );
    }
  } );

  router.post( '/cerrarSesion', async ( req, res ) => {
    try {
      // Obtener el token del encabezado de la solicitud
      const token=req.body.user.tokens

      // Implementar la lógica para cerrar la sesión, como invalidar el token, etc.
      // Por ejemplo, puedes mantener una lista de tokens válidos en la base de datos y 
      // eliminar el token actual de la lista al cerrar sesión.

      // Verificar si el token está presente
      if ( !token ) {
        return res.status( 401 ).json( { error: 'Token no proporcionado' } );
      }

      // Verificar y decodificar el token
      jwt.verify( token, 'secreto', async ( err, decodedToken ) => {
        if ( err ) {
          return res.status( 401 ).json( { error: 'Token no válido' } );
        }

        // Aquí puedes realizar acciones adicionales al cerrar sesión, como invalidar el token.
        // Por ejemplo, podrías almacenar el token en una lista negra en la base de datos.

        // En este ejemplo, simplemente respondemos con un mensaje
        res.json( { message: 'Sesión cerrada correctamente' } );
      } );
    } catch ( error ) {
      console.error( 'Error al cerrar la sesión:', error );
      res.status( 500 ).json( { error: 'Error al cerrar la sesión' } );
    }
  } );
  router.get( '/listarHorarios/:id', async ( req, res ) => {
    console.log("entro al al ruta")
   try{
    const id_persona=req.params.id

    // Obtén la fecha actual

    const fechaActual=new Date();
    console.log( fechaActual )
    console.log( id_persona+"este es el id de la persona" )
    /* const listaHorarioPersona=await HorarioPersona.find( { id_persona: id_persona } ).populate( [
      {
        path: 'id_horario',
        match: {

          dia: { $eq: "2023-12-14T05:00:00.000+00:00"},
  
        },
      },
      { path: 'id_grupo', select: [ 'name' ] },
      { path: 'id_curso', select: [ 'name' ] },
      { path: 'id_persona', select: [ 'name' ] },
    ] ); */
    const listaHorarioPersona=await HorarioPersona.find( { id_persona: id_persona } ).populate( [
      {
        path: 'id_horario',
      },
      { path: 'id_grupo', select: [ 'name' ] },
      { path: 'id_curso', select: [ 'name' ] },
      { path: 'id_persona', select: [ 'name' ] },
    ] );

    res.json( listaHorarioPersona );
   }catch(error){
    console.error( 'Error al cerrar la sesión:', error );
      res.status( 500 ).json( { error: 'Error al encontrar horarioPersonas' } );
   }
  })
  router.get( '/validarCodigo/:nameAula', async ( req, res ) => {
    try {
      const busquedaAula=await Aula.findOne( { name: new RegExp( req.params.nameAula, 'i' ) } );
      res.json( busquedaAula );
    } catch ( error ) {
      res.status( 500 ).json( { error: 'error , codigo QR , aula no existe' } );
    }
  } );


  router.post( '/validarHorario', async ( req, res ) => {
    /*  const horaActual = moment().tz('America/Lima');
     console.log("la hora actual es ---> "+ horaActual.format('HH:mm'))
     const horaActual2 = moment()
     console.log("la hora actual es ---> "+ horaActual2.format('HH:mm'))
     const { idAula, idPersona, password }=req.body
     console.log(idAula + " --  " + idPersona + " --  " +password) */
     
    try {


      const { idPersona, idAula, password }=req.body
      console.log( idAula+"  ---   "+idPersona )
      const allHorarios=await Horario.find( {} );

      if ( allHorarios.length>0 ) {
        for ( const horario of allHorarios ) {
          console.log( horario );
        }
      } else {
        console.log( 'No se encontraron registros de horario.' );
      }


      const horaActual=moment();

      // Agregar 5 horas
      const horaInicioMoment=horaActual.clone().add( 5, 'hours' );
      const horaFinMoment=horaActual.clone().add( 5, 'hours' );
      console.log( horaInicioMoment.toDate()+" oooooooooooooo" )
      const formatoFecha='YYYY-MM-DDTHH:mm:ss.SSSZ';
      const horaInicioFormateada=horaInicioMoment.format( formatoFecha ).replace( /(\d{2}:\d{2}:\d{2}\.\d{3})[-+]\d{2}:\d{2}/, '$1+00:00' );;
      console.log( horaInicioFormateada+" ññññññññññññññ" )


      const searchHorario=await Horario.findOne( {
        aula: idAula,
        hora_inicio: { $lte: horaInicioFormateada },
        hora_fin: { $gt: horaInicioFormateada },

      } );
      /* "2023-12-12T03:15:00.000+00:00" */


      console.log( "ddddddddddd" )
      console.log( { searchHorario }+searchHorario._id+" --- "+idPersona )
      const searchHorarioPersona=await HorarioPersona.findOne( {
        id_horario: { $exists: true, $eq: searchHorario._id },
        id_persona: { $exists: true, $eq: idPersona },

      } );
      console.log( "ssssssssss"+searchHorarioPersona )

      if ( searchHorarioPersona ) {
        searchHorarioPersona.asistencia="A";
        await searchHorarioPersona.save();

        console.log( 'Enviando evento asistenciaCambiada:', {
          idHorarioPersona: searchHorarioPersona._id,
          nuevaAsistencia: searchHorarioPersona.asistencia,
        } );

        io.emit( 'asistenciaCambiada', {
          idHorarioPersona: searchHorarioPersona._id,
          nuevaAsistencia: searchHorarioPersona.asistencia,
        } );
      }
      res.json( searchHorarioPersona );
    } catch ( error ) {
      console.error( error );
      res.status( 500 ).json( { error: 'error, Horario Persona' } );

      // Usar io desde el parámetro
      io.emit( 'asistenciaCambiada', 'Hola, error' );
    }
  } );
  return router;
}





module.exports=RouterApiMovil;

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
