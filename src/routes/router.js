const express = require('express')
const {vistaPrincipal, vistaAulas} = require('../controllers/PageController')
const router = express.Router()

router.get('/', vistaPrincipal)
router.get('/aulas', vistaAulas)

module.exports = {routes: router}