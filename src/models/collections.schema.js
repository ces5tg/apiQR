const mongoose=require( 'mongoose' );


const CarreraSchema = new mongoose.Schema({
    name:String , 
    descripcion:String , 
    nro_ciclos: String ,
})
const Carrera=mongoose.model( 'Carrera', CarreraSchema );

const CursoSchema = new mongoose.Schema({
    name:String , 
    horas_lab:Number , 
    horas_teo:Number, 
    horas_total:Number , 
    id_carrera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
    },

})
const Curso = mongoose.model( 'Curso', CursoSchema );

const GrupoSchema = new mongoose.Schema({
    name : String , 
    nro_inscritos : Number , 
    id_carrera: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carrera',
    }, 
})
const Grupo = mongoose.model( 'Grupo', GrupoSchema );

const PersonaSchema=new mongoose.Schema( {
    name: String,
    firstName: String,
    lastName: String,
    dni: String,
    estado: String,
    rol: {
        type: String,
        enum: [ 'admin', 'profesor', ' otro' ]
    },
    user: {
        username: String,
        email: String,
        password: String,
        profileImage: String,
    }

} );
const Persona=mongoose.model( 'Persona', PersonaSchema );

const AulaSchema=new mongoose.Schema( {
    name: String,
    descripcion: String,
    zona: String,
    codigo: String,
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
    id_grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo',
    },
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
    },
    id_persona: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persona',
    },
    asistencia: Boolean,//validar que el profe asistio
    estado: Boolean,//cuando se valide la informaciokn del qr , id del profesor , true
    contrasena: String
} );
const HorarioPersona=mongoose.model( 'HorarioPersona', HorarioPersonaSchema );


module.exports={
    Aula, Persona, Horario, HorarioPersona , Carrera , Curso , Grupo
}














