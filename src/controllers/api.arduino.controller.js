const {Aula} = require('../models/collections.schema')

const getByNameAula = async(req , res) =>{
    try {
        const aula=await Aula.findOne( { name: req.params.name } )
        console.log( aula )
        res.json( aula )
    } catch {
        console.log( "error en el Aula" )
    }
}
const getByAulaIdHorario = async (req , res) =>{
    try {
        const horarios=await Horario.find( { aula: req.params.aula_id } )
        res.json( horarios )
    } catch ( error ) {
        console.log( "error horarios" )
    }
}
const getByHorario_HorarioPersona = async(req , res)=>{
    try {
        const horarioPersona=await HorarioPersona.findOne( { id_horario: req.params.horario_id } )
        res.json( horarioPersona )
    } catch ( error ) {
        console.log( "error horarios" )
    }
}
const asistencia = async(req , res)=>{
    try {
        const { asistencia, id_horario }=req.body
        const horarioPersona=await HorarioPersona.updateOne( { _id: id_horario }, { asistencia: asistencia } );
        res.json( horarioPersona )
    } catch ( error ) {
        console.log( "error horarios" )
    }
}

module.exports = {
    getByNameAula ,
    getByAulaIdHorario , 
    getByHorario_HorarioPersona,
    asistencia

}