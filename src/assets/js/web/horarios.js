// Función para mostrar el formulario de edición
function showEditForm(id, dia, hora_inicio, hora_fin, aula) {
    hideAllEditForms();

    document.getElementById('editId').value = id;
    const fechaInicio = new Date(hora_inicio);
    const fechaFin = new Date(hora_fin);

    // Ajustar las fechas y horas a la zona horaria deseada (en este caso, GMT-5)
    fechaInicio.setHours(fechaInicio.getHours() - 5);
    fechaFin.setHours(fechaFin.getHours() - 5);

    // Formatear las fechas y horas para los campos de entrada
    const formatoDia = new Date(dia).toISOString().split('T')[0];
    const formatoInicio = fechaInicio.toISOString().split('T')[1].substring(0, 5);
    const formatoFin = fechaFin.toISOString().split('T')[1].substring(0, 5);

    document.getElementById('horarioDia').value = formatoDia;
    document.getElementById('horarioInicio').value = formatoInicio;
    document.getElementById('horarioFin').value = formatoFin;
    document.getElementById('horarioAula').value = aula;
    document.getElementById('submitBtn').innerText = 'Guardar Cambios';
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
function submitHorarioForm() {
    const horarioId = document.getElementById('editId').value;
    // Obtener los valores de los campos
    const horarioDia = document.getElementById('horarioDia').value;
    const horarioInicio = document.getElementById('horarioInicio').value;
    const horarioFin = document.getElementById('horarioFin').value;
    const horarioAula = document.getElementById('horarioAula').value;
    console.log(horarioDia,horarioInicio,horarioFin,horarioAula);

    if (horarioId) {
        fetch(`/api/web/horario/${horarioId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dia: horarioDia, hora_inicio_formt_edit: horarioInicio, hora_fin_formt_edit: horarioFin, aula: horarioAula }), // Enviar los nuevos datos como JSON
        })
            .then(response => response.json())
            .then(data => {
                // Ocultar el formulario de edición
                // Actualizar la página sin recargar
                location.reload();
                return false; // Evitar la recarga por defecto del formulario
            })
            .catch(error => console.error('Error al editar horario:', error));
    } else {
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
    }
    // Realizar la creación de manera asíncrona (AJAX)

    return false; // Evitar el envío por defecto del formulario
}