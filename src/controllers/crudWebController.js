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

const momentTime=require( 'moment-timezone' );

// Rutas para Pagina de inicio
router.get( '/', async ( req, res ) => {
    try {
        const aulas=await Aula.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'aula', 'crud.ejs' ), { titulo: "Pagina de Inicio", aulas: aulas } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de personas' } );
    }
} );


// Rutas para CRUD de Persona
router.get( '/personas', async ( req, res ) => {
    try {
        const personas=await Persona.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'persona', 'crud.ejs' ), { personas, titulo: "Personas", } );
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
        const horarios=await Horario.find().populate( [{path:'aula'  , select:'name'}]);
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

        const horarios=await Horario.find({estado:false});
        const cursos=await Curso.find();
        const grupos=await Grupo.find();
        const personas=await Persona.find();
        res.render( path.join( __dirname, '..', '..', 'views', 'horarioPersona', 'crud.ejs' ), { horariosPersonas, horarios, grupos, cursos, personas, titulo: "Horarios Persona" } );
    } catch ( error ) {
        console.error( 'Error al obtener horario persona:', error );
        res.status( 500 ).json( { message: 'Error al obtener la lista de aulas' } );
    }
} );

// Rutas para CRUD de Horarios-Asistencia
router.get( '/horarioAsistencia', async ( req, res ) => {
    try {
        const horaActual3=moment().utcOffset( '-05:00' );

        const horaReferencia=moment().utcOffset( '-05:00' ).set( { hours: 0, minutes: 30, seconds: 0, milliseconds: 0 } );

        const diferenciaEnMinutos=horaActual3.diff( horaReferencia, 'minutes' );

        const intervalo = 50;
        const minutosRedondeados = Math.floor(diferenciaEnMinutos/intervalo )*intervalo;

        const horaActual=horaReferencia.add( minutosRedondeados, 'minutes' );
        console.log( horaActual+"hora actual" )

        const horaDespues=horaActual.clone().add( 50, 'minutes' )
        console.log( horaDespues+" horas despues" )

        const h2 = await HorarioPersona.find()
            .populate( [
                { path: 'id_horario', populate: { path: 'aula' } },
                { path: 'id_grupo', select: [ 'name' ] },
                { path: 'id_curso', select: [ 'name' ] },
                { path: 'id_persona', select: [ 'name' ] }
            ] );

        console.log( { h2 } )
        const horariosPersonas=h2.filter( horarioPersona => {

            const horaHorario_db=moment( horarioPersona.id_horario.hora_inicio, 'HH:mm' );
            
            console.log( "----------------------"+horarioPersona.id_horario.hora_inicio )

            console.log( horaHorario_db.format( 'HH:mm' )+" zzzzzz " )

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
            { dia: "Martes", horarios: [] },
            { dia: "Miercoles", horarios: [] },
            { dia: "Jueves", horarios: [] },
            { dia: "Viernes", horarios: [] },
            { dia: "Sabado", horarios: [] },
            { dia: "Domingo", horarios: [] },
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
                    id_horario: "",
                    nameAula:"",
                    nameCurso:"",
                    namePersona:"",
                    nameGrupo:"",
                    imagenQR:""


                };

                listaHorarios[ countItem ].horarios.push( nuevoHorario );

                console.log(
                    listaHorarios[ countItem ].horarios[ count ].hora_inicio+
                    " - "+
                    listaHorarios[ countItem ].horarios[ count ].hora_fin+
                    " - "+
                    listaHorarios[ countItem ].horarios[ count ].id_horario
                );

                count++;
            }


            countItem++
            console.log( "----------------------" )
        }
        console.log( "#######################" )
        /* const horarios=await Horario.find().populate( [
            { path: 'aula', select: [ 'name' ] }
        ] );; */
        const horarios=await HorarioPersona.find()
        .populate( [
            { path: 'id_horario', populate: { path: 'aula' } },
            { path: 'id_grupo'},
            { path: 'id_curso'  },
            { path: 'id_persona' }
        ] );
  
        // Convertir la cadena a un objeto Date
        console.log( { horarios } )
        console.log( "¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿" )


        for ( const horario of horarios ) {// horarios de la BASE DE DATOS

            console.log( horario.id_horario.dia )
            var count=0
            const diasSemana=[ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ];
            const diaSemana=diasSemana[ moment( horario.id_horario.dia ).tz( 'America/Lima' ).day() ];
            console.log( diaSemana+" --  dia de la semana" )

            const horaInicioPeru=momentTime( horario.id_horario.hora_inicio ).tz( 'America/Lima' ).format( 'HH:mm' );
            console.log( horaInicioPeru+" esta es hora inicio PERU" )
            for ( const j of listaHorarios ) { // FORMATO HORARIOS / DIAS - HORAS
                console.log( j.dia )//Dia de la semana
                /* i -> listaHorario -> dia
                       i -> listaHorario -> horario[]
                    */
  
                for ( const i of j.horarios ) {
                    /* 
                        i -> HORARIO_INICIO - HORARIO_FIN
                    */
                   /* console.log(horaInicioPeru +" === "+ i.hora_inicio) */
                    if ( j.dia==diaSemana && ( i.hora_inicio === horaInicioPeru ) ) {
 
                        console.log( i.hora_inicio+" -- "+i.hora_fin )
                        console.log("1")
                        i.id_horario = horario.id_horario._id
                        console.log("2")
    
                        i.nameAula=horario.id_horario.aula.name,
                        console.log("3")

                        i.nameCurso=horario.id_curso.name,
                        i.namePersona=horario.id_persona.name,
                        i.nameGrupo=horario.id_grupo.name
                        i.imagenQR = horario.id_horario.aula.codigo
                        
                    }
                }
                
            }
            count++
        }

        console.log(listaHorarios[3].horarios[8])

        const personas = await Persona.find()
        const grupos = await Grupo.find()
        res.render( path.join( __dirname, '..', '..', 'views', 'admin', 'horarioTable.ejs' ), { horarios: listaHorarios  , personas , grupos} );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener los horarios existentes' } );
    }

} )


module.exports=router;
