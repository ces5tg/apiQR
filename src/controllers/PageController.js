const vistaPrincipal = (req, res)=>{
    res.render('home')
}

const vistaAulas = (req, res)=>{
    res.render('/views/aula/crud.ejs')
}

module.exports = {
    vistaPrincipal,
    vistaAulas
}