// script.js

$(document).ready(function() {
    // Función para mostrar el formulario de creación
    function mostrarFormulario() {
        $('#formularioCrear').show();
    };

    // Función para crear una nueva aula
    function crearAula() {
        // Obtener datos del formulario
        const nombre = $('#nombre').val();
        const descripcion = $('#descripcion').val();
        const zona = $('#zona').val();
        const codigo = $('#codigo').val();

        // Enviar datos al servidor
        $.post('/rutas/aula', { name: nombre, descripcion, Zona: zona, Codigo: codigo })
            .done(function(aula) {
                // Actualizar la lista de aulas
                actualizarListaAulas();
                // Ocultar el formulario después de crear el aula
                $('#formularioCrear').hide();
                // Limpiar los campos del formulario
                $('#nombre').val('');
                $('#descripcion').val('');
                $('#zona').val('');
                $('#codigo').val('');
            })
            .fail(function(error) {
                console.error('Error al crear el aula:', error);
            });
    };

    // Función para actualizar la lista de aulas
    function actualizarListaAulas() {
        // Obtener la lista de aulas desde el servidor
        $.get('/rutas/aula')
            .done(function(aulas) {
                // Limpiar la lista
                $('#listaAulas').empty();

                // Mostrar cada aula en la lista
                aulas.forEach(function(aula) {
                    $('#listaAulas').append(`<li>${aula.name} - ${aula.descripcion} - ${aula.Zona} - ${aula.Codigo}</li>`);
                });
            })
            .fail(function(error) {
                console.error('Error al obtener la lista de aulas:', error);
            });
    }

    // Llamar a la función para actualizar la lista de aulas al cargar la página
    actualizarListaAulas();
});
