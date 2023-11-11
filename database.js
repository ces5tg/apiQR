const mongoose=require( 'mongoose' );
const { mongodbURL }=require( './config.js' )

mongoose.connect( mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} )
    .then( () => console.log( 'MongoDB connected!' ) )
    .catch( ( error ) => console.error( 'MongoDB connection error:', error ) );