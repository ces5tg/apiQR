const {app} = require('./app');
const port = 3001;
require('./database')


// Para que se ejecute el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}/`);
});












  


