const socket=io.connect();

let tiempoRestante = 60;
function actualizarTabla() {
    console.log("w")
    // Simula la actualización de la tabla (reemplaza con tu lógica real)
    const tabla=document.getElementById( 'miTabla' );
    const tbody=tabla.querySelector( 'tbody' );
    tbody.innerHTML=`<tr><td>Contenido actualizado (próxima actualización en ${ tiempoRestante } segundos)</td></tr>`;
    tiempoRestante--;

    // Si el contador llega a cero, reinícialo y realiza la actualización
    if (tiempoRestante === 0) {
      tiempoRestante = 60; // Reinicia el contador a 60 segundos
      actualizarCampoAsistencia();
    }
}

function actualizarCampoAsistencia() {
    console.log('Campo de asistencia actualizado');
    socket.emit('campoAsistenciaActualizado', "asf");
  }
// Configura un intervalo para actualizar la tabla cada 50 minutos (50 * 60 * 1000 milisegundos)
setInterval( actualizarTabla,1000 );