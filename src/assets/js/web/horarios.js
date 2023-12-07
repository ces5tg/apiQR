// Función para mostrar el formulario de edición
function showEditForm(id, dia, hora_inicio, hora_fin, aula) {
    hideAllEditForms();

    document.getElementById('editId').value = id;

    // Convertir las cadenas de fecha y hora en objetos de fecha
    const fechaInicio = new Date(hora_inicio);
    const fechaFin = new Date(hora_fin);

    // Ajustar las fechas y horas a la zona horaria deseada (en este caso, GMT-5)
    fechaInicio.setHours(fechaInicio.getHours() - 5);
    fechaFin.setHours(fechaFin.getHours() - 5);

    // Formatear las fechas y horas para los campos de entrada
    const formatoDia = fechaInicio.toISOString().split('T')[0];
    const formatoInicio = fechaInicio.toISOString().split('T')[1].substring(0, 5);
    const formatoFin = fechaFin.toISOString().split('T')[1].substring(0, 5);

    document.getElementById('editDia').value = formatoDia;
    document.getElementById('editInicio').value = formatoInicio;
    document.getElementById('editFin').value = formatoFin;
    document.getElementById('editAula').value = aula;
    document.getElementById('editForm').style.display = 'block';
}

// Función para ocultar todos los formularios de edición
function hideAllEditForms() {
    const editForms = document.querySelectorAll('.edit-form');
    editForms.forEach(form => {
        form.style.display = 'none';
    });
}

// Función para confirmar antes de eliminar
function confirmDelete(horarioId) {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
        // Realizar eliminación de manera asíncrona (AJAX)
        fetch(`/api/web/horario/${horarioId}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                // Actualizar la página sin recargar
                location.reload();
            })
            .catch(error => console.error('Error al eliminar horario:', error));
    }
}

// Función para realizar la creación de horario y recargar la página
function createHorario() {
    // Obtener los valores de los campos
    const horarioDia = document.getElementById('horarioDia').value;
    const horarioInicio = document.getElementById('horarioInicio').value;
    const horarioFin = document.getElementById('horarioFin').value;
    const horarioAula = document.getElementById('horarioAula').value;
    console.log(horarioDia,horarioInicio,horarioFin,horarioAula);
    // Realizar la creación de manera asíncrona (AJAX)
    fetch("/api/web/horario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dia: horarioDia, hora_inicio_formt: horarioInicio, hora_fin_formt: horarioFin, aula: horarioAula }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch((error) => console.error("Error al crear horario:", error));

    return false; // Evitar el envío por defecto del formulario
}

// Función para realizar la edición de horario y recargar la página
function editHorario() {
    // Obtener los valores de los campos
    const horarioId = document.getElementById('editId').value;
    const newHorarioDia = document.getElementById('editDia').value;
    const newHorarioInicio = document.getElementById('editInicio').value;
    const newHorarioFin = document.getElementById('editFin').value;
    const newHorarioAula = document.getElementById('editAula').value;

    // Realizar la edición de manera asíncrona (AJAX)
    fetch(`/api/web/horario/${horarioId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dia: newHorarioDia, hora_inicio_formt_edit: newHorarioInicio, hora_fin_formt_edit: newHorarioFin, aula: newHorarioAula }), // Enviar los nuevos datos como JSON
    })
        .then(response => response.json())
        .then(data => {
            // Ocultar el formulario de edición
            document.getElementById('editForm').style.display = 'none';
            // Actualizar la página sin recargar
            location.reload();
            return false; // Evitar la recarga por defecto del formulario
        })
        .catch(error => console.error('Error al editar horario:', error));

    return false; // Evitar el envío por defecto del formulario
}