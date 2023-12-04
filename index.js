const {app} = require('./app');
const http = require("http") ;
const { Server } = require('socket.io'); // Corregir aquí
const sockets = require('./sockets')


require('./database')

const se = http.createServer(app)


const httpServer = se.listen( 3000, () => {
    console.log( `Server started on port3000` );
});
const io = new Server(httpServer)
sockets(io)