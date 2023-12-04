const http = require('http');
const fs = require('fs')
const express=require( 'express' );
const bodyParser=require( 'body-parser' );

const cors = require('cors')
const apiArduino=require( './src/routes/api.arduino' );
const apiMovil=require( './src/routes/api.movil' );

// Eequipo Web
const apiWeb = require('./src/controllers/apiWebController');
const crudWeb = require('./src/controllers/crudWebController')


const app=express();
app.use(cors());



  
app.set( 'view engine', 'ejs' );
app.use( bodyParser.urlencoded( { extended: false } ) );

//IMPORTANTE -> NO TOQUEN NADA DE API/ARDUINO Y MOVIL
app.use( '/api/arduino', apiArduino);
app.use( '/api/movil', apiMovil);

// Rutas para Api - Equipo Web
app.use('/api/web/', apiWeb);
app.use('/web/', crudWeb);


app.get( '/', ( req, res ) => {//Por defecto la ruta de inicio es esta /api
  res.redirect( '/web/' );
} );
app.get('/hola' , (req , res) =>{
  
})

module.exports ={
  app
}
