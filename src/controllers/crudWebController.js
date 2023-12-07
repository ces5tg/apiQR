const express=require( 'express' );
const router=express.Router();
const path=require( 'path' );

// Importar los modelos
const Persona=require( '../models/persona' );
const Aula=require( '../models/aula' );
const Carrera=require( '../models/carrera' );
const Curso=require( '../models/curso' );
const Grupo=require( '../models/grupo' );
const Horario=require( '../models/horario' );
const HorarioPersona=require( '../models/horarioPersona' );
const moment=require( 'moment' );
const { app }=require( '../../app' );

const momentTime = require('moment-timezone');
const horario=require( '../models/horario' );
// Rutas para Pagina de inicio
router.get( '/', async ( req, res ) => {
    try {
        const personas=await Persona.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'layouts', 'navBar.ejs' ), { titulo: "Pagina de Inicio" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de personas' } );
    }
} );


// Rutas para CRUD de Persona
router.get( '/personas', async ( req, res ) => {
    try {
        const personas=await Persona.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'persona', 'crud.ejs' ), { personas, titulo: "Personas" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de personas' } );
    }
} );

// Rutas para CRUD de Aula
router.get( '/aulas', async ( req, res ) => {
    try {
        const aulas=await Aula.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'aula', 'crud.ejs' ), { aulas, titulo: "Aulas" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de aulas' } );
    }
} );

// Rutas para CRUD de Carrera
router.get( '/carreras', async ( req, res ) => {
    try {
        const carreras=await Carrera.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'carrera', 'crud.ejs' ), { carreras, titulo: "Carreras" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de carreras' } );
    }
} );

// Rutas para CRUD de Curso
router.get( '/cursos', async ( req, res ) => {
    try {
        const cursos=await Curso.find().populate( 'id_carrera' );
        const carreras=await Carrera.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'curso', 'crud.ejs' ), { cursos, carreras, titulo: "Cursos" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de cursos' } );
    }
} );

// Rutas para CRUD de Grupo
router.get( '/grupos', async ( req, res ) => {
    try {
        const grupos=await Grupo.find().populate( 'id_carrera' );
        const carreras=await Carrera.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'grupo', 'crud.ejs' ), { grupos, carreras, titulo: "Grupos" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de grupos' } );
    }
} );

// Rutas para CRUD de Horarios
router.get( '/horarios', async ( req, res ) => {
    try {
        const horarios=await Horario.find().populate( 'aula' );
        const aulas=await Aula.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'horario', 'crud.ejs' ), { horarios, aulas, titulo: "Horarios2" } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de aulas' } );
    }
} );

// Rutas para CRUD de Horarios-Persona
router.get( '/horariosPersonas', async ( req, res ) => {
    try {
        const horariosPersonas=await HorarioPersona.find()
            .populate( [
                { path: 'id_horario' },
                { path: 'id_grupo', select: [ 'name' ] },
                { path: 'id_curso', select: [ 'name' ] },
                { path: 'id_persona', select: [ 'name' ] }
            ] );

        const horarios=await Horario.find();
        const cursos=await Curso.find();
        const grupos=await Grupo.find();
        const personas=await Persona.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'horarioPersona', 'crud.ejs' ), { horariosPersonas, horarios, grupos, cursos, personas, titulo: "Horarios Persona" } );
    } catch ( error ) {
        console.error( 'Error al obtener horario persona:', error );
        res.status( 500 ).json( { message: 'Error al obtener la lista de aulas' } );
    }
} );

// Rutas para CRUD de Horarios-Persona
router.get( '/horarioAsistencia', async ( req, res ) => {
    // estableciendo un rango de horario  , 
    try {
        // Obtén la hora actual y la hora actual más una hora
        const horaActual2=moment().utcOffset( '-05:00' );

        // Obtén la hora actual en la zona horaria de Perú (UTC-05:00)
        const horaActual3=moment().utcOffset( '-05:00' );

        // Establece la hora de referencia a las 00:30 am
        const horaReferencia=moment().utcOffset( '-05:00' ).set( { hours: 0, minutes: 30, seconds: 0, milliseconds: 0 } );

        // Calcula la diferencia en minutos entre la hora actual y la hora de referencia
        const diferenciaEnMinutos=horaActual3.diff( horaReferencia, 'minutes' );

        // Calcula los minutos redondeados al intervalo de 50 minutos
        const intervalo=50;
        const minutosRedondeados=Math.floor( diferenciaEnMinutos/intervalo )*intervalo;

        // Agrega los minutos redondeados a la hora de referencia
        const horaActual=horaReferencia.add( minutosRedondeados, 'minutes' );
        console.log( horaActual+"hora actual" )

        const horaDespues=horaActual.clone().add( 50, 'minutes' )
        console.log( horaDespues+" horas despues" )

        //console.log(horaActual.format('HH:mm'))
        //const h = horaActual
        //console.log(horaActual.format('HH:mm') + ' --zz-- '+ horaDespues.format('HH:mm'))

        // Obtén la lista de horariosPersonas
        const h2=await HorarioPersona.find()
            .populate( [
                { path: 'id_horario', populate: { path: 'aula' } },
                { path: 'id_grupo', select: [ 'name' ] },
                { path: 'id_curso', select: [ 'name' ] },
                { path: 'id_persona', select: [ 'name' ] }
            ] );

        // Filtra la lista de horariosPersonas
        console.log( { h2 } )
        const horariosPersonas=h2.filter( horarioPersona => {
            const horaHorario_db=moment( horarioPersona.id_horario.hora_inicio, 'HH:mm' );
            console.log( "----------------------"+horarioPersona.id_horario.hora_inicio )

            // Aumenta 5 horas
            console.log( horaHorario_db.format( 'HH:mm' )+" zzzzzz " )
            //const horaAumentada = horaHorario_db.add(5, 'hours');

            // Formatea la nueva hora
            //const horaForm_db_aumentada = horaAumentada.format('HH:mm');

            console.log( horaActual.format( 'HH:mm' )+' -- '+horaHorario_db.format( 'HH:mm' )+' -- '+horaDespues.format( 'HH:mm' ) )
            return horaHorario_db.format( 'HH:mm' )>=horaActual.format( 'HH:mm' )&&horaHorario_db.format( 'HH:mm' )<horaDespues.format( 'HH:mm' );
        } );

        res.render( path.join( __dirname, '..', '..', 'views', 'admin', 'horarioAsistencia.ejs' ), { horariosPersonas } );
    } catch ( error ) {
        console.error( 'Error al obtener horario persona:', error );
        res.status( 500 ).json( { message: 'Error al obtener la lista de aulas' } );
    }
} );

router.get( '/horarioTable', async ( req, res ) => {
    try {
        
        const listaHorarios=[
            { dia: "Lunes", horarios: [] },
             {dia: "Martes", horarios: []},
             {dia: "Miercoles", horarios: []},
             {dia: "Jueves", horarios: []},
             {dia: "Viernes", horarios: []},
             {dia: "Sabado", horarios: []},
             {dia: "Domingo", horarios: []},
            // Add more entries as needed
        ];

        // Agregar otro horario al final de la entrada correspondiente


        var countItem=0
        for ( item of listaHorarios ) {

            var count=0
            console.log( listaHorarios[ countItem ].dia+" - " )
            while ( count<20 ) {
                const currentDate=new Date();
                currentDate.setHours( 6, 20, 0, 0 );
                currentDate.setMinutes( currentDate.getMinutes()+50*count );

                const formattedTimeInicio=currentDate.toLocaleTimeString( "en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                } );

                // Crear una nueva fecha agregando 50 minutos a la hora de inicio
                const nuevaFechaFin=new Date( currentDate );
                nuevaFechaFin.setMinutes( nuevaFechaFin.getMinutes()+50 );

                const formattedTimeFin=nuevaFechaFin.toLocaleTimeString( "en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                } );

                var nuevoHorario={
                    hora_inicio: formattedTimeInicio,
                    hora_fin: formattedTimeFin,
                    id_horario: "0",
                };

                listaHorarios[ countItem ].horarios.push( nuevoHorario );

                /* console.log(
                    listaHorarios[ countItem ].horarios[ count ].hora_inicio+
                    " - "+
                    listaHorarios[ countItem ].horarios[ count ].hora_fin+
                    " - "+
                    listaHorarios[ countItem ].horarios[ count ].id_horario
                ); */

                count++;
            }


            countItem++
            console.log( "----------------------" )
        }
        console.log("#######################")
        const horarios=await Horario.find();

        // Convertir la cadena a un objeto Date
        console.log({horarios})
        console.log("¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿")
        

        const fecha=new Date( horarios[ 0 ].dia );

        // Obtener el día de la semana en formato numérico (0 para Domingo, 1 para Lunes, ..., 6 para Sábado)
        const diaSemanaNumero=fecha.getDay();

        // Crear un array con los nombres de los días de la semana
        const nombresDias=[ "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo" ];

        // Obtener el nombre del día de la semana
        const diaSemana=nombresDias[ diaSemanaNumero ];

        console.log( "Día de la semana:", diaSemana );
        for (const horario of horarios ) {// horarios de la BASE DE DATOS
           console.log("hola")
            }
        

            console.log("final de la peticion")

        res.render( path.join( __dirname, '..', '..', 'views', 'admin', 'horarioTable.ejs' ), { horarios:listaHorarios } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener los horarios existentes' } );
    }

} )


module.exports=router;
