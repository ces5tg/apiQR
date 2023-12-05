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
const moment = require('moment');


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
        console.log(horaActual2.format('HH:mm') + "la hora actual de PERU ")
/*         const horaDespues=moment().utcOffset( '-05:00' ).add(50, 'minutes'); */
        const intervalo = 50; // Intervalo en minutos
        const minutosRedondeados = Math.floor((horaActual2.minutes() ) / intervalo) *intervalo ;
        const horaActual = horaActual2.clone().minutes(minutosRedondeados);

        const  horaDespues = horaActual.clone().add(50 , 'minutes')

        //console.log(horaActual.format('HH:mm'))
        //const h = horaActual
        //console.log(horaActual.format('HH:mm') + ' --zz-- '+ horaDespues.format('HH:mm'))

        // Obtén la lista de horariosPersonas
        const h2=await HorarioPersona.find()
            .populate( [
                { path: 'id_horario'  , populate :{ path:'aula'}},
                { path: 'id_grupo', select: [ 'name' ] },
                { path: 'id_curso', select: [ 'name' ] },
                { path: 'id_persona', select: [ 'name' ] }
            ] );

        // Filtra la lista de horariosPersonas
        console.log({h2})
        const horariosPersonas = h2.filter(horarioPersona => {
            const horaHorario_db = moment(horarioPersona.id_horario.hora_inicio, 'HH:mm');
            console.log("----------------------"+horarioPersona.id_horario.hora_inicio)

            // Aumenta 5 horas
            console.log(horaHorario_db.format('HH:mm') + " zzzzzz ")
            //const horaAumentada = horaHorario_db.add(5, 'hours');

            // Formatea la nueva hora
            //const horaForm_db_aumentada = horaAumentada.format('HH:mm');

            console.log(horaActual.format('HH:mm') + ' -- '+ horaHorario_db.format('HH:mm') + ' -- '+horaDespues.format('HH:mm'))
            return horaHorario_db.format('HH:mm') >= horaActual.format('HH:mm') && horaHorario_db.format('HH:mm') < horaDespues.format('HH:mm');
        });

        res.render( path.join( __dirname, '..', '..', 'views', 'admin', 'horarioAsistencia.ejs' ), { horariosPersonas } );
    } catch ( error ) {
        console.error( 'Error al obtener horario persona:', error );
        res.status( 500 ).json( { message: 'Error al obtener la lista de aulas' } );
    }
} );


module.exports=router;
