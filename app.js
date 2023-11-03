
const express=require( 'express' );
const bodyParser=require( 'body-parser' );
const mongoose=require( 'mongoose' );
const rutasRouter=require( './routes/rutas' );

const app=express();

/* mongoose.connect( "mongodb://127.0.0.1:27017/apiQR", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} )
  .then( () => console.log( 'MongoDB connected!' ) )
  .catch( ( error ) => console.error( 'MongoDB connection error:', error ) );
 */
  mongoose.connect( "mongodb+srv://admin:g9CuxmY2dZ72H5AX@apiqr.s0gdkma.mongodb.net/apiQR?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } )
    .then( () => console.log( 'MongoDB connected!' ) )
    .catch( ( error ) => console.error( 'MongoDB connection error:', error ) );
  
app.set( 'view engine', 'ejs' );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( '/rutas', rutasRouter );

app.get( '/', ( req, res ) => {

  res.redirect( '/rutas' );
} );


app.listen( 3000, () => {
  console.log( `Server started on port ${ process.env.PORT }` );
} );



