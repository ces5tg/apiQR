module.exports = (io) => {
    io.on("connection", (socket) => {
      // console.log(socket.handshake.url);
      console.log(`Nuevo socket conectado: ${socket.id}`);
  
      socket.on("campoAsistenciaActualizado", async (data) => {
        console.log(data);
      });
    });
  };