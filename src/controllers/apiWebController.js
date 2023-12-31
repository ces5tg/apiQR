const express=require( 'express' );
const router=express.Router();


// Importar los modelos
const Persona=require( '../models/persona' );
const Aula=require( '../models/aula' );
const Carrera=require( '../models/carrera' );
const Curso=require( '../models/curso' );
const Grupo=require( '../models/grupo' );
const Horario=require( '../models/horario' );
const HorarioPersona=require( '../models/horarioPersona' );
const dotenv=require( 'dotenv' );
const qrcode=require( 'qrcode' );

const moment=require( 'moment' );

const momentTime=require( 'moment-timezone' );
dotenv.config();

router.use( express.json() );

// CRUD para Persona
router.get( '/persona', async ( req, res ) => {
    try {
        const personas=await Persona.find();
        res.json( personas );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la lista de personas' } );
    }
} );

router.post( '/persona', async ( req, res ) => {
    try {
        const { name, firstName, lastName, dni, estado, rol, user }=req.body;
        const nuevaPersona=new Persona( { name, firstName, lastName, dni, estado, rol, user } );
        const personaGuardada=await nuevaPersona.save();
        res.json( personaGuardada );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al guardar la persona' } );
    }
} );

router.get( '/persona/:id', async ( req, res ) => {
    try {
        const persona=await Persona.findById( req.params.id );
        res.json( persona );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de la persona' } );
    }
} );

router.put( '/persona/:id', async ( req, res ) => {
    try {
        const { name, firstName, lastName, dni, estado, rol, user }=req.body;
        const personaActualizada=await Persona.findByIdAndUpdate(
            req.params.id,
            { name, firstName, lastName, dni, estado, rol, user },
            { new: true }
        );
        res.json( personaActualizada );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al actualizar la persona' } );
    }
} );

router.delete( '/persona/:id', async ( req, res ) => {
    try {
        await Persona.findByIdAndDelete( req.params.id );
        res.json( { message: 'Persona eliminada correctamente' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al eliminar la persona' } );
    }
} );

// CRUD para Aula
router.post( '/aula', async ( req, res ) => {
    try {
        console.log( "ingreso a aula post" )
        const { name, descripcion, zona, codigo }=req.body;
        console.log( "antes" )
        const url=`http://${process.env.IP_LOCALHOST}/api/movil/validarCodigo/${ name }`
        console.log( url )

        const codigoq=await qrcode.toDataURL( url )
        console.log( codigoq )

        const nuevaAula=new Aula( { name, descripcion, zona, codigo: codigoq } );
        const aulaGuardada=await nuevaAula.save();

        res.json( aulaGuardada );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al guardar el aula' } );
    }
} );

router.get( '/aula', async ( req, res ) => {
    try {
        const aulas=await Aula.find();
        res.json( aulas );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de las aulas' } );
    }
} );

router.get( '/aula/:id', async ( req, res ) => {
    try {
        const aula=await Aula.findById( req.params.id );
        res.json( aula );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información del aula' } );
    }
} );

router.put( '/aula/:id', async ( req, res ) => {
    try {
        const { name, descripcion, zona, codigo }=req.body;
        const aulaActualizada=await Aula.findByIdAndUpdate(
            req.params.id,
            { name, descripcion, zona, codigo },
            { new: true }
        );
        console.log(aulaActualizada)
        res.json( aulaActualizada );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al actualizar el aula' } );
    }
} );

router.delete( '/aula/:id', async ( req, res ) => {
    try {
        await Aula.findByIdAndDelete( req.params.id );
        res.json( { message: 'Aula eliminada correctamente' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al eliminar el aula' } );
    }
} );

// CRUD para Carrera
router.post( '/carrera', async ( req, res ) => {
    try {
        const { name, descripcion, nro_ciclos }=req.body;
        const nuevaCarrera=new Carrera( { name, descripcion, nro_ciclos } );
        const carreraGuardada=await nuevaCarrera.save();
        res.json( carreraGuardada );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al guardar la carrera' } );
    }
} );

router.get( '/carrera', async ( req, res ) => {
    try {
        const carreras=await Carrera.find();
        res.json( carreras );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de las carreras' } );
    }
} );

router.get( '/carrera/:id', async ( req, res ) => {
    try {
        const carrera=await Carrera.findById( req.params.id );
        res.json( carrera );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de la carrera' } );
    }
} );

router.put( '/carrera/:id', async ( req, res ) => {
    try {
        const { name, descripcion, nro_ciclos }=req.body;
        const carreraActualizada=await Carrera.findByIdAndUpdate(
            req.params.id,
            { name, descripcion, nro_ciclos },
            { new: true }
        );
        res.json( carreraActualizada );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al actualizar la carrera' } );
    }
} );

router.delete( '/carrera/:id', async ( req, res ) => {
    try {
        await Carrera.findByIdAndDelete( req.params.id );
        res.json( { message: 'Carrera eliminada correctamente' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al eliminar la carrera' } );
    }
} );


// CRUD para Curso
router.post( '/curso', async ( req, res ) => {
    try {
        const { name, horas_lab, horas_teo, id_carrera }=req.body;

        let horas_total=( horas_lab*1 )+( horas_teo*1 );
        const nuevoCurso=new Curso( { name, horas_lab, horas_teo, horas_total, id_carrera } );
        const cursoGuardado=await nuevoCurso.save();
        res.json( cursoGuardado );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( { message: 'Error al guardar el curso' } );
    }
} );

router.get( '/curso', async ( req, res ) => {
    try {
        const cursos=await Curso.find().populate( 'id_carrera' );
        res.json( cursos );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de los cursos' } );
    }
} );

router.get( '/curso/:id', async ( req, res ) => {
    try {
        const curso=await Curso.findById( req.params.id ).populate( 'id_carrera' );
        res.json( curso );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información del curso' } );
    }
} );

router.put( '/curso/:id', async ( req, res ) => {
    try {
        const { name, horas_lab, horas_teo, id_carrera }=req.body;

        let horas_total = (horas_lab* 1) + ( horas_teo * 1 );
        const cursoActualizado=await Curso.findByIdAndUpdate(
            req.params.id,
            { name, horas_lab, horas_teo, horas_total, id_carrera },
            { new: true }
        ).populate( 'id_carrera' );
        res.json( cursoActualizado );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al actualizar el curso' } );
    }
} );

router.delete( '/curso/:id', async ( req, res ) => {
    try {
        await Curso.findByIdAndDelete( req.params.id );
        res.json( { message: 'Curso eliminado correctamente' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al eliminar el curso' } );
    }
} );


// CRUD para Grupo
router.post( '/grupo', async ( req, res ) => {
    try {
        const { name, nro_inscritos, id_carrera }=req.body;
        const nuevoGrupo=new Grupo( { name, nro_inscritos, id_carrera } );
        const grupoGuardado=await nuevoGrupo.save();
        res.json( grupoGuardado );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al guardar el grupo' } );
    }
} );

router.get( '/grupo', async ( req, res ) => {
    try {
        const grupos=await Grupo.find().populate( 'id_carrera' );
        res.json( grupos );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de los grupos' } );
    }
} );

router.get( '/grupo/:id', async ( req, res ) => {
    try {
        const grupo=await Grupo.findById( req.params.id ).populate( 'id_carrera' );
        res.json( grupo );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información del grupo' } );
    }
} );

router.put( '/grupo/:id', async ( req, res ) => {
    try {
        const { name, nro_inscritos, id_carrera }=req.body;
        const grupoActualizado=await Grupo.findByIdAndUpdate(
            req.params.id,
            { name, nro_inscritos, id_carrera },
            { new: true }
        ).populate( 'id_carrera' );
        res.json( grupoActualizado );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al actualizar el grupo' } );
    }
} );

router.delete( '/grupo/:id', async ( req, res ) => {
    try {
        await Grupo.findByIdAndDelete( req.params.id );
        res.json( { message: 'Grupo eliminado correctamente' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al eliminar el grupo' } );
    }
} );

// CRUD para Horario
router.post( '/horario', async ( req, res ) => {
    const zonaHorariaPeru='America/Lima';
    try {
        const { dia, hora_inicio_formt, hora_fin_formt, aula }=req.body;

        const diaIncreased=moment.tz( dia, zonaHorariaPeru ).format( 'YYYY-MM-DDTHH:mm:ss.SSSZ' );
        var var_hora_ini=`${ dia }T${ hora_inicio_formt }:00.000-05:00`;
        var var_hora_fin=`${ dia }T${ hora_fin_formt }:00.000-05:00`;

        const nuevoHorario=new Horario( {
            dia: diaIncreased,
            hora_inicio: var_hora_ini,
            hora_fin: var_hora_fin,
            aula: aula
        } );
        const horarioGuardado=await nuevoHorario.save();
        res.json( horarioGuardado );
    } catch ( error ) {
        console.error( 'Error en la creación de horario:', error );
        res.status( 500 ).json( { message: 'Error al guardar el horario' } );
    }
} );

router.get( '/horario', async ( req, res ) => {
    try {
        const horarios=await Horario.find().populate( 'aula' );
        res.json( horarios );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información de los horarios' } );
    }
} );

router.get( '/horario/:id', async ( req, res ) => {
    try {
        const horario=await Horario.findById( req.params.id ).populate( 'aula' );
        res.json( horario );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener la información del horario' } );
    }
} );

router.put( '/horario/:id', async ( req, res ) => {
    const zonaHorariaPeru='America/Lima';
    try {
        const { dia, hora_inicio_formt_edit, hora_fin_formt_edit, estado, aula }=req.body;

        const diaIncreased=moment.tz( dia, zonaHorariaPeru ).format( 'YYYY-MM-DDTHH:mm:ss.SSSZ' );
        let var_hora_ini=`${ dia }T${ hora_inicio_formt_edit }:00.000-05:00`;
        let var_hora_fin=`${ dia }T${ hora_fin_formt_edit }:00.000-05:00`;

        const hora_inicio=moment.tz( var_hora_ini, zonaHorariaPeru ).format( 'YYYY-MM-DDTHH:mm:ss.SSSZ' );
        const hora_fin=moment.tz( var_hora_fin, zonaHorariaPeru ).format( 'YYYY-MM-DDTHH:mm:ss.SSSZ' );

        const horarioActualizado=await Horario.findByIdAndUpdate(
            req.params.id,
            { dia: diaIncreased, hora_inicio, hora_fin, estado, aula },
            { new: true }
        ).populate( 'aula' );

        res.json( horarioActualizado );
    } catch ( error ) {
        console.error( 'Error al actualizar el horario:', error );
        res.status( 500 ).json( { message: 'Error al actualizar el horario' } );
    }
} );


router.delete( '/horario/:id', async ( req, res ) => {
    try {
        await Horario.findByIdAndDelete( req.params.id );
        res.json( { message: 'Horario eliminado correctamente' } );
    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al eliminar el horario' } );
    }
} );

// CRUD para Horario-Persona
router.get( '/horarioPersona/:id', async ( req, res ) => {
    try {
        const horarioPersona=await HorarioPersona.findById( req.params.id );
        res.json( horarioPersona );
    } catch ( error ) {
        console.error( 'Error al obtener horario persona por ID:', error );
        res.status( 500 ).json( { error: 'Error interno del servidor' } );
    }
} );

router.post( '/horarioPersona', async ( req, res ) => {
    try {
        const { id_horario, id_grupo, id_curso, id_persona }=req.body;
        const horarioPersona=new HorarioPersona( { id_horario, id_grupo, id_curso, id_persona, asistencia: 'F' } );
        const horarioPersonaGuardado=await horarioPersona.save();

        const result=await Horario.updateOne(
            { _id: id_horario },
            { $set: { estado: true } }
        );


        res.json( horarioPersonaGuardado );
    } catch ( error ) {
        console.error( 'Error al crear horario persona:', error );
        res.status( 500 ).json( { error: 'Error interno del servidor' } );
    }
} );

router.put( '/horarioPersona/:id', async ( req, res ) => {
    try {
        const { id_horario, id_grupo, id_curso, id_persona }=req.body;
        const horarioPersonaActualizado=await HorarioPersona.findByIdAndUpdate(
            req.params.id,
            { id_horario, id_grupo, id_curso, id_persona },
            { new: true }
        );
        res.json( horarioPersonaActualizado );
    } catch ( error ) {
        console.error( 'Error al actualizar horario persona por ID:', error );
        res.status( 500 ).json( { error: 'Error interno del servidor' } );
    }
} );

router.delete( '/horarioPersona/:id', async ( req, res ) => {
    try {
        const deleteHorarioPersona=await HorarioPersona.findByIdAndDelete( req.params.id );
        console.log( deleteHorarioPersona )
        const result=await Horario.updateOne(
            { _id: deleteHorarioPersona.id_horario },
            { $set: { estado: false } }
        );


        res.json( { message: 'Horario Persona eliminado correctamente' } );
    } catch ( error ) {
        console.error( 'Error al eliminar horario persona por ID:', error );
        res.status( 500 ).json( { error: 'Error interno del servidor' } );
    }
} );

//=====================================================SOCKET.IO , LISTA DE HORARIOSPERSONAS
router.get( '/horarioAsistencia', async ( req, res ) => {
    console.log( "api horario Asistencia " )

    try {
        // Obtén la hora actual y la hora actual más una hora
        const horaActual=moment().utcOffset( '-05:00' );
        const horaDespues=moment().utcOffset( '-05:00' ).add( 1, 'hour' );

        // Obtén la lista de horariosPersonas
        const h2=await HorarioPersona.find()
            .populate( [
                { path: 'id_horario' },
                { path: 'id_grupo', select: [ 'name' ] },
                { path: 'id_curso', select: [ 'name' ] },
                { path: 'id_persona', select: [ 'name' ] }
            ] );

        // Filtra la lista de horariosPersonas
        const horariosPersonas=h2.filter( horarioPersona => {
            const horaHorario=moment( horarioPersona.id_horario.hora, 'HH:mm' ); // Ajusta el formato según la estructura de tu objeto
            const fechaHorario=moment( horarioPersona.id_horario.fecha, 'YYYY-MM-DD' ); // Ajusta el formato según la estructura de tu objeto

            // Comprueba si la hora del horarioPersona está dentro del rango y si es el mismo día
            return horaHorario.isBetween( horaActual, horaDespues )&&fechaHorario.isSame( horaActual, 'day' );
        } );

        res.json( horariosPersonas );
    } catch ( error ) {
        console.error( 'Error al obtener horario persona:', error );
        res.status( 500 ).json( { message: 'Error al obtener la lista de aulas' } );
    }
} );

router.get( '/horarioTable', async ( req, res ) => {
    const selectPersona=req.query.selectPersona
    const selectGrupo=req.query.selectGrupo
    console.log( selectPersona+" -----------------" )

    const listaHorarios=[
        { dia: "Lunes", horarios: [] },
        { dia: "Martes", horarios: [] },
        { dia: "Miercoles", horarios: [] },
        { dia: "Jueves", horarios: [] },
        { dia: "Viernes", horarios: [] },
        { dia: "Sabado", horarios: [] },
        { dia: "Domingo", horarios: [] },

    ];
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
                nameAula: "",
                nameCurso: "",
                namePersona: "",
                nameGrupo: "",
                imagenQR:""
            };
            listaHorarios[ countItem ].horarios.push( nuevoHorario );
            count++;
        }
        countItem++
        console.log( "----------------------" )
    }
    console.log( "#######################" )
    /* const horarios=await Horario.find().populate( [
        { path: 'aula', select: [ 'name' ] }
    ] );; */
    try {

        const query={};
        if ( selectPersona ) {
            query.id_persona=selectPersona;
        }

        if ( selectGrupo ) {
            query.id_grupo=selectGrupo;
        }

        const horarios=await HorarioPersona.find( query )
            .populate( [
                { path: 'id_horario', populate: { path: 'aula' } },
                { path: 'id_grupo' },
                { path: 'id_curso' },
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
                    if ( j.dia==diaSemana&&( i.hora_inicio===horaInicioPeru ) ) {

                        console.log( i.hora_inicio+" -- "+i.hora_fin )
                        console.log( "1" )
                        i.id_horario=horario.id_horario._id
                        console.log( "2" )

                        i.nameAula=horario.id_horario.aula.name,
                            console.log( "3" )

                        i.nameCurso=horario.id_curso.name,
                        i.namePersona=horario.id_persona.name,
                        i.nameGrupo=horario.id_grupo.name,
                        i.imagenQR = horario.id_horario.aula.codigo

                        console.log(i.imagenQR);
                    }

                }

            }
            count++
        }

        console.log( listaHorarios[ 3 ].horarios[ 8 ] )

        console.log( "final de la peticion" )

        res.json( listaHorarios )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'Error al obtener los horarios existentes' } );
    }

} )




module.exports=router;
