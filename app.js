
const express=require( 'express' );
const bodyParser=require( 'body-parser' );
const cors = require('cors')
const apiArduino=require( './src/routes/api.arduino' );
const apiMovil=require( './src/routes/api.movil' );
const app=express();
app.use(cors());



  
app.set( 'view engine', 'ejs' );
app.use( bodyParser.urlencoded( { extended: false } ) );


app.use( '/api/arduino', apiArduino);
app.use( '/api', apiMovil);

app.get( '/', ( req, res ) => {

  res.redirect( '/rutas' );
} );


module.exports ={
  app
}













