const { app } = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const sockets = require('./sockets');
const cors = require('cors'); // Importar el paquete cors

const RouterApiMovil = require('./src/routes/api.movil');
require('./database');

const se = http.createServer(app);

// Configurar CORS antes de definir rutas o middleware
app.use(cors())


const httpServer = se.listen(3000, () => {
    console.log(`Server started on port 3000`);
});

const  io = new Server(httpServer);
exports.module = io

sockets(io);

/* const routerApiMovil = RouterApiMovil(io);
app.use('/api/movil', routerApiMovil); */
